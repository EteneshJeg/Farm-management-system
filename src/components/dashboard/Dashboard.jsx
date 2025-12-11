import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardStats } from "./DashboardStats";
import { EggProductionChart } from "./EggProductionChart";
import React from "react";
import { ReportSummaryTable } from "./ReportSummaryTable";

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Monitor your farm performance and daily metrics
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Egg Production (Last 7 Days)
            </CardTitle>
            <CardDescription>
              Daily egg collection trends for layer farms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EggProductionChart />
          </CardContent>
        </Card>

        <Card className="shadow-card xl:col-span-1">
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Recent Reports
            </CardTitle>
            <CardDescription>
              Latest daily reports across all farms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportSummaryTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
