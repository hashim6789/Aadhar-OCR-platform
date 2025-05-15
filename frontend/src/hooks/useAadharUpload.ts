import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFormData, uploadSchema } from "@/schema";
import { getAxiosErrorMessage } from "@/lib";
import { ImageType, IRecord } from "@/types";
import { AadharMessages } from "@/constants";
import { uploadFileService } from "@/services";

export function useAadharUpload() {
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [record, setRecord] = useState<IRecord | null>(null);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const handleFileChange = (
    file: File | null,
    field: ImageType,
    setPreview: (url: string | null) => void
  ) => {
    if (file && file.type.startsWith("image/")) {
      setValue(field, file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
      setError("");
    } else {
      setValue(field, undefined as unknown as File, { shouldValidate: true });
      setPreview(null);
      setError(
        field === "frontImage"
          ? AadharMessages.ERROR_INVALID_FRONT_IMAGE
          : AadharMessages.ERROR_INVALID_BACK_IMAGE
      );
    }
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    field: ImageType,
    setPreview: (url: string | null) => void
  ) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange(file, field, setPreview);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onSubmit = async (data: UploadFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await uploadFileService(data);
      setRecord(response.data);
      setIsResultOpen(true);
    } catch (err: unknown) {
      setError(getAxiosErrorMessage(err, AadharMessages.ERROR_UPLOAD_FAILED));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      if (backPreview) URL.revokeObjectURL(backPreview);
    };
  }, [frontPreview, backPreview]);

  return {
    frontPreview,
    backPreview,
    error,
    isLoading,
    record,
    frontInputRef,
    backInputRef,
    errors,
    isResultOpen,
    setIsResultOpen,
    handleSubmit,
    onSubmit,
    handleFileChange,
    handleDrop,
    handleDragOver,
    setFrontPreview,
    setBackPreview,
  };
}
