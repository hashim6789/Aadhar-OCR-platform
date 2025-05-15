import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAxiosErrorMessage } from "@/lib";
import { IRecord } from "@/types/IRecord";
import { FetchFormattedData, fetchFormattedSchema } from "@/schema";
import { AadharMessages } from "@/constants";
import { fetchAadhaarService } from "@/services";

export function useAadharFetch() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [record, setRecord] = useState<IRecord | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FetchFormattedData>({
    resolver: zodResolver(fetchFormattedSchema),
  });

  const onSubmit = async (data: FetchFormattedData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchAadhaarService(data.aadharNo, data.dob);

      setRecord(response.data);
    } catch (err: unknown) {
      setError(getAxiosErrorMessage(err, AadharMessages.ERROR_FETCH_FAILED));
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
