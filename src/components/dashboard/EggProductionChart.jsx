import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, isAfter, parseISO, subDays } from "date-fns";

import React from "react";
import { useAppSelector } from "@/hooks/useAppDispatch";

export const EggProductionChart = ({ farmId }) => {
  const { farms, reports } = useAppSelector((state) => state.farm);

  const sevenDaysAgo = subDays(new Date(), 7);

  // Filter reports for the last 7 days
  const recentReports = reports.filter((r) => {
    const reportDate = parseISO(r.date);
    const isRecent = isAfter(reportDate, sevenDaysAgo);
    const matchesFarm = farmId ? r.farmId === farmId : true;
    return isRecent && matchesFarm;
  });

  // Prepare chart data
  const chartData = [];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return format(date, "yyyy-MM-dd");
  });

  last7Days.forEach((dateStr) => {
    const dataPoint = {
      date: format(parseISO(dateStr), "MMM d"),
    };

    const farmsToShow = farmId
      ? farms.filter((f) => f.id === farmId)
      : farms.filter((f) => f.flockType === "Layers");

    farmsToShow.forEach((farm) => {
      const report = recentReports.find(
        (r) => r.farmId === farm.id && r.date === dateStr
      );
      dataPoint[farm.farmName] = report ? report.eggsCollected : 0;
    });

    chartData.push(dataPoint);
  });

  const layerFarms = farmId
    ? farms.filter((f) => f.id === farmId)
    : farms.filter((f) => f.flockType === "Layers");

  const colors = ["#2d6a4f", "#40916c", "#52b788", "#74c69d", "#95d5b2"];

  if (layerFarms.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
        <p className="text-muted-foreground">
          No layer farms available for egg production chart
        </p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-md)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend />
          {layerFarms.map((farm, index) => (
            <Line
              key={farm.id}
              type="monotone"
              dataKey={farm.farmName}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ fill: colors[index % colors.length], strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
