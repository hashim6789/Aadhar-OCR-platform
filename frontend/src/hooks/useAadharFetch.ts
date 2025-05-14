import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { axiosInstance } from "@/lib";
import { IRecord } from "@/types/IRecord";
import axios from "axios";

// Zod schema for Aadhar fetch form
const fetchSchema = z.object({
  aadharNo: z
    .string()
    .regex(/^\d{12}$/, "Aadhar number must be 12 digits")
    .min(12, "Aadhar number must be 12 digits")
    .max(12, "Aadhar number must be 12 digits"),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
});

type FormData = z.infer<typeof fetchSchema>;

// Status constants
const STATUS = {
  ERROR_INVALID_AADHAR:
    "Invalid Aadhar number. Please enter a 12-digit number.",
  ERROR_INVALID_DOB: "Invalid date of birth. Please use YYYY-MM-DD format.",
  ERROR_FETCH_FAILED: "Failed to fetch Aadhar details. Please try again.",
} as const;

// Utility function to get axios error message
export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Something went wrong"
): string {
  if (axios.isAxiosError(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  return fallback;
}

export function useAadharFetch() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [record, setRecord] = useState<IRecord | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fetchSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post<IRecord>("/aadhar/fetch", {
        aadharNo: data.aadharNo,
        dob: data.dob,
      });
      setRecord(response.data);
    } catch (err: unknown) {
      setError(getAxiosErrorMessage(err, STATUS.ERROR_FETCH_FAILED));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    record,
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
