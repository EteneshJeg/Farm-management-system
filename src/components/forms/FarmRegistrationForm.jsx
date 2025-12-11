import { Bird, Building2, Calendar, MapPin, User } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { registerFarmStart } from "@/store/farmSlice";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const flockTypes = ["Layers", "Broilers", "Breeders", "Free Range"];

const farmSchema = z.object({
  farmName: z
    .string()
    .min(2, "Farm name must be at least 2 characters")
    .max(100),
  ownerName: z
    .string()
    .min(2, "Owner name must be at least 2 characters")
    .max(100),
  latitude: z.number().min(-90, "Invalid latitude").max(90, "Invalid latitude"),
  longitude: z
    .number()
    .min(-180, "Invalid longitude")
    .max(180, "Invalid longitude"),
  flockType: z.enum(["Layers", "Broilers", "Breeders", "Free Range"]),
  initialBirdCount: z.number().min(1, "Must have at least 1 bird").max(1000000),
  startDate: z.string().min(1, "Start date is required"),
});

export const FarmRegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error, farms } = useAppSelector((state) => state.farm);
  const prevFarmsCount = useRef(farms.length);

  const form = useForm({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      farmName: "",
      ownerName: "",
      latitude: 0,
      longitude: 0,
      flockType: "Layers",
      initialBirdCount: 100,
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (farms.length > prevFarmsCount.current && !loading.submittingFarm) {
      toast({
        title: "Farm Registered!",
        description: "Your farm has been successfully registered.",
      });
      form.reset();
    }
    prevFarmsCount.current = farms.length;
  }, [farms.length, loading.submittingFarm, form]);

  useEffect(() => {
    if (error.submittingFarm) {
      toast({
        title: "Registration Failed",
        description: error.submittingFarm,
        variant: "destructive",
      });
    }
  }, [error.submittingFarm]);

  const onSubmit = (data) => {
    dispatch(
      registerFarmStart({
        farmName: data.farmName,
        ownerName: data.ownerName,
        location: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        flockType: data.flockType,
        initialBirdCount: data.initialBirdCount,
        startDate: data.startDate,
      })
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Register New Farm
        </h2>
        <p className="text-muted-foreground mt-1">
          Add a new poultry farm to the management system
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="farmName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    Farm Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Green Valley Poultry"
                      {...field}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Owner Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., John Smith"
                      {...field}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">
                      Latitude
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.0001"
                        placeholder="-90 to 90"
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
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-muted-foreground">
                      Longitude
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.0001"
                        placeholder="-180 to 180"
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="flockType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Bird className="h-4 w-4 text-primary" />
                    Flock Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select flock type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-card">
                      {flockTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initialBirdCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Bird Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Start Date
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto px-8"
            disabled={loading.submittingFarm}
          >
            {loading.submittingFarm ? (
              <LoadingSpinner size="sm" text="Registering..." />
            ) : (
              "Register Farm"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
