import { Egg, Skull, Wheat } from "lucide-react";
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useAppSelector } from "@/hooks/useAppDispatch";

export const ReportSummaryTable = () => {
  const { farms, reports, loading } = useAppSelector((state) => state.farm);

  const tableData = useMemo(() => {
    return reports
      .map((report) => {
        const farm = farms.find((f) => f.id === report.farmId);
        return {
          ...report,
          farmName: farm?.farmName || "Unknown Farm",
          flockType: farm?.flockType || "Unknown",
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [reports, farms]);

  if (tableData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
        <p>No reports available yet.</p>
        <p className="text-sm">Submit daily reports to see them here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Farm</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold text-right">
                <span className="flex items-center justify-end gap-1">
                  <Egg className="h-4 w-4 text-accent" />
                  Eggs
                </span>
              </TableHead>
              <TableHead className="font-semibold text-right">
                <span className="flex items-center justify-end gap-1">
                  <Wheat className="h-4 w-4 text-warning" />
                  Feed (kg)
                </span>
              </TableHead>
              <TableHead className="font-semibold text-right">
                <span className="flex items-center justify-end gap-1">
                  <Skull className="h-4 w-4 text-destructive" />
                  Mortality
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((report) => (
              <TableRow
                key={report.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium">
                  {format(parseISO(report.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell>{report.farmName}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.flockType === "Layers" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {report.flockType}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {report.eggsCollected.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {report.feedUsed.toFixed(1)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  <span
                    className={report.mortality > 0 ? "text-destructive" : ""}
                  >
                    {report.mortality}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
