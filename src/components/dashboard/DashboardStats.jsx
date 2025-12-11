import { Bird, Building2, Egg, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import React from "react";
import { useAppSelector } from "@/hooks/useAppDispatch";

const StatCard = ({ icon, label, value, subtext }) => (
  <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-display font-semibold mt-1">{value}</p>
          {subtext && (
            <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  const { farms, reports } = useAppSelector((state) => state.farm);

  const totalBirds = farms.reduce(
    (acc, farm) => acc + farm.initialBirdCount,
    0
  );
  const totalMortality = reports.reduce(
    (acc, report) => acc + report.mortality,
    0
  );
  const currentBirds = totalBirds - totalMortality;

  const totalEggs = reports.reduce(
    (acc, report) => acc + report.eggsCollected,
    0
  );

  // Calculate today's eggs
  const today = new Date().toISOString().split("T")[0];
  const todaysReports = reports.filter((r) => r.date === today);
  const todaysEggs = todaysReports.reduce((acc, r) => acc + r.eggsCollected, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Building2 className="h-6 w-6 text-primary" />}
        label="Total Farms"
        value={farms.length}
        subtext={`${
          farms.filter((f) => f.flockType === "Layers").length
        } layer farms`}
      />
      <StatCard
        icon={<Bird className="h-6 w-6 text-primary" />}
        label="Current Birds"
        value={currentBirds.toLocaleString()}
        subtext={`${totalMortality} total mortality`}
      />
      <StatCard
        icon={<Egg className="h-6 w-6 text-accent" />}
        label="Total Eggs"
        value={totalEggs.toLocaleString()}
        subtext="All time production"
      />
      <StatCard
        icon={<TrendingUp className="h-6 w-6 text-success" />}
        label="Today's Eggs"
        value={todaysEggs.toLocaleString()}
        subtext={`${todaysReports.length} reports today`}
      />
    </div>
  );
};
