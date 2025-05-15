import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadFormData, uploadSchema } from "@/schema";
import { ImageType } from "@/types";
import { AadharMessages } from "@/constants";
import { useAadharStore } from "@/store";

export function useAadharUpload() {
  const {
    setError,
    frontPreview,
    backPreview,
    error,
    isLoading,
    record,
    isResultOpen,
    uploadAadhar,
    setIsResultOpen,
    setFrontPreview,
    setBackPreview,
  } = useAadharStore();

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
    isResultOpen,
    setIsResultOpen,
    setFrontPreview,
    setBackPreview,
    frontInputRef,
    backInputRef,
    errors,
    handleSubmit,
    onSubmit: uploadAadhar,
    handleFileChange,
    handleDrop,
    handleDragOver,
  };
}
