import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchFormattedData, fetchFormattedSchema } from "@/schema";
import { useAadharStore } from "@/store";

export function useAadharFetch() {
  const { fetchAadhar, error, record, isLoading } = useAadharStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FetchFormattedData>({
    resolver: zodResolver(fetchFormattedSchema),
  });

  return {
    error,
    isLoading,
    record,
    register,
    handleSubmit,
    onSubmit: fetchAadhar,
    errors,
  };
}
