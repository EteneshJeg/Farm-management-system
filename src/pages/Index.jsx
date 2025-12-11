import { Bird, FileText, LayoutDashboard, Leaf } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchFarmsStart, fetchReportsStart } from "@/store/farmSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";

import { Card } from "@/components/ui/card";
import { DailyReportForm } from "@/components/forms/DailyReportForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { FarmRegistrationForm } from "@/components/forms/FarmRegistrationForm";
import { Provider } from "react-redux";
import { store } from "@/store";

const FarmManagementContent = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    dispatch(fetchFarmsStart());
    dispatch(fetchReportsStart());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                Farm Management System
              </h1>
              <p className="text-primary-foreground/80 mt-1">
                Track, manage, and optimize your poultry operations
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-muted/50 p-1">
            <TabsTrigger
              value="dashboard"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Bird className="h-4 w-4" />
              <span className="hidden sm:inline">Register Farm</span>
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Daily Report</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-slide-up">
            <Dashboard />
          </TabsContent>

          <TabsContent value="register" className="animate-slide-up">
            <Card className="p-6 md:p-8 shadow-card">
              <FarmRegistrationForm />
            </Card>
          </TabsContent>

          <TabsContent value="report" className="animate-slide-up">
            <Card className="p-6 md:p-8 shadow-card">
              <DailyReportForm />
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Farm Management System • Built with React, Redux & RxJS
          </p>
        </div>
      </footer>
    </div>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <FarmManagementContent />
    </Provider>
  );
};

export default Index;
