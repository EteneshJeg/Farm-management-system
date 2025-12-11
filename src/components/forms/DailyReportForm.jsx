import { Building2, Calendar, Egg, Skull, Wheat } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { submitReportStart } from "@/store/farmSlice";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const reportSchema = z.object({
  farmId: z.string().min(1, "Please select a farm"),
  date: z.string().min(1, "Date is required"),
  eggsCollected: z.number().min(0, "Cannot be negative").max(100000),
  feedUsed: z.number().min(0, "Cannot be negative").max(10000),
  mortality: z.number().min(0, "Cannot be negative").max(10000),
});

export const DailyReportForm = () => {
  const dispatch = useAppDispatch();
  const { farms, reports, loading, error } = useAppSelector(
    (state) => state.farm
  );
  const prevReportsCount = useRef(reports.length);

  const form = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      farmId: "",
      date: new Date().toISOString().split("T")[0],
      eggsCollected: 0,
      feedUsed: 0,
      mortality: 0,
    },
  });

  useEffect(() => {
    if (
      reports.length > prevReportsCount.current &&
      !loading.submittingReport
    ) {
      toast({
        title: "Report Submitted!",
        description: "Daily report has been recorded successfully.",
      });
      form.reset({
        farmId: "",
        date: new Date().toISOString().split("T")[0],
        eggsCollected: 0,
        feedUsed: 0,
        mortality: 0,
      });
    }
    prevReportsCount.current = reports.length;
  }, [reports.length, loading.submittingReport, form]);

  useEffect(() => {
    if (error.submittingReport) {
      toast({
        title: "Submission Failed",
        description: error.submittingReport,
        variant: "destructive",
      });
    }
  }, [error.submittingReport]);

  const onSubmit = (data) => {
    dispatch(
      submitReportStart({
        farmId: data.farmId,
        date: data.date,
        eggsCollected: data.eggsCollected,
        feedUsed: data.feedUsed,
        mortality: data.mortality,
      })
    );
  };

  const selectedFarm = farms.find((f) => f.id === form.watch("farmId"));

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Daily Farm Report
        </h2>
        <p className="text-muted-foreground mt-1">
          Record daily production metrics for your farm
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="farmId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Select Farm
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Choose a farm" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card">
                      {farms.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No farms registered
                        </SelectItem>
                      ) : (
                        farms.map((farm) => (
                          <SelectItem key={farm.id} value={farm.id}>
                            {farm.farmName} ({farm.flockType})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Report Date
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {selectedFarm && (
            <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
              <p className="text-sm text-muted-foreground">
                Recording for:{" "}
                <span className="font-medium text-foreground">
                  {selectedFarm.farmName}
                </span>
                {" • "}
                <span className="text-primary">{selectedFarm.flockType}</span>
                {" • "}
                {selectedFarm.initialBirdCount.toLocaleString()} birds
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="eggsCollected"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Egg className="h-4 w-4 text-accent" />
                    Eggs Collected
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedUsed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Wheat className="h-4 w-4 text-warning" />
                    Feed Used (kg)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step={0.1}
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mortality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Skull className="h-4 w-4 text-destructive" />
                    Mortality
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto px-8"
            disabled={loading.submittingReport || farms.length === 0}
          >
            {loading.submittingReport ? (
              <LoadingSpinner size="sm" text="Submitting..." />
            ) : (
              "Submit Report"
            )}
          </Button>

          {farms.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No farms registered yet. Please register a farm first.
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};
