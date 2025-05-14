"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FetchFormData, fetchSchema } from "@/schema";

interface AadharFetchFormProps {
  onFetchSubmit: (data: { aadharNo: string; dob: string }) => void;
  fetchLoading: boolean;
}

export default function AadharFetchForm({
  onFetchSubmit,
  fetchLoading,
}: AadharFetchFormProps) {
  const [aadharInput, setAadharInput] = useState("");

  // Initialize form with react-hook-form and zod
  const form = useForm<FetchFormData>({
    resolver: zodResolver(fetchSchema),
    defaultValues: {
      aadharNo: "",
      year: "",
      month: "",
      day: "",
    },
  });

  // Format Aadhar number as XXXX XXXX XXXX
  const formatAadharNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    const groups = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    return groups.join(" ").trim();
  };

  // Handle Aadhar number input change
  const handleAadharChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 12) {
      setAadharInput(formatAadharNumber(value));
      onChange(value); // Store raw digits
    }
  };

  // Handle form submission
  const handleSubmit = (data: FetchFormData) => {
    const formattedData = {
      aadharNo: data.aadharNo,
      dob: `${data.year}-${data.month.padStart(2, "0")}-${data.day.padStart(
        2,
        "0"
      )}`,
    };
    onFetchSubmit(formattedData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fetch Aadhar Details</CardTitle>
        <CardDescription>
          Enter your Aadhar number and date of birth to fetch details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="aadharNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234 5678 9012"
                      value={aadharInput}
                      onChange={(e) => handleAadharChange(e, field.onChange)}
                      maxLength={14} // 12 digits + 2 spaces
                      className="font-mono"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="YYYY"
                        {...field}
                        maxLength={4}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="MM"
                        {...field}
                        maxLength={2}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="DD"
                        {...field}
                        maxLength={2}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/\D/g, ""))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-center">
              <Button type="submit" disabled={fetchLoading} className="w-full">
                {fetchLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span className="ml-2">Fetching...</span>
                  </div>
                ) : (
                  "Fetch Details"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
