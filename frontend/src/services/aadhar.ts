import {
  axiosInstance,
  getAxiosErrorMessage,
  showErrorToast,
  showSuccessToast,
} from "@/lib";
import { UploadFormData } from "@/schema";
import { IRecord } from "@/types";

export interface ApiResponse<T> {
  data: T;
  status: number;
}

// Service for fetching Aadhaar details
export async function fetchAadhaarService(
  aadharNo: string,
  dob: string
): Promise<ApiResponse<IRecord>> {
  try {
    const response = await axiosInstance.get<IRecord>("/aadhar", {
      params: { aadharNo, dob },
    });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(
      error,
      "Failed to fetch Aadhaar details."
    );
    showErrorToast(message);
    throw new Error(message);
  }
}

// Service for uploading files
export async function uploadFileService(
  data: UploadFormData
): Promise<ApiResponse<IRecord>> {
  try {
    const formData = new FormData();
    formData.append("frontImage", data.frontImage);
    formData.append("backImage", data.backImage);

    const response = await axiosInstance.post<IRecord>("/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    showSuccessToast("File uploaded successfully.");
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    const message = getAxiosErrorMessage(error, "File upload failed.");
    showErrorToast(message);
    throw new Error(message);
  }
}
