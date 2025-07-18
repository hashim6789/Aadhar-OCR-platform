import { create } from "zustand";
import { IRecord } from "@/types/IRecord";
import { UploadFormData } from "@/schema";
import { fetchAadhaarService, uploadFileService } from "@/services";
import { getAxiosErrorMessage } from "@/lib";
import { AadharMessages } from "@/constants";

interface AadharState {
  frontPreview: string | null;
  backPreview: string | null;
  error: string;
  isLoading: boolean;
  record: IRecord | null;
  isResultOpen: boolean;
  setFrontPreview: (preview: string | null) => void;
  setBackPreview: (preview: string | null) => void;
  setError: (error: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setRecord: (record: IRecord | null) => void;
  setIsResultOpen: (isOpen: boolean) => void;
  uploadAadhar: (data: UploadFormData) => Promise<void>;
  fetchAadhar: (aadharNo: string, dob: string) => Promise<void>;
}

export const useAadharStore = create<AadharState>((set) => ({
  frontPreview: null,
  backPreview: null,
  error: "",
  isLoading: false,
  record: null,
  isResultOpen: false,

  setFrontPreview: (preview) => set({ frontPreview: preview }),
  setBackPreview: (preview) => set({ backPreview: preview }),
  setError: (error) => set({ error }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setRecord: (record) => set({ record }),
  setIsResultOpen: (isOpen) => set({ isResultOpen: isOpen }),

  uploadAadhar: async (data) => {
    set({ isLoading: true, error: "" });
    try {
      const response = await uploadFileService(data);
      set({ record: response.data, isResultOpen: true });
    } catch (err) {
      set({
        error: getAxiosErrorMessage(err, AadharMessages.ERROR_UPLOAD_FAILED),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAadhar: async (aadharNo, dob) => {
    set({ isLoading: true, error: "" });
    try {
      const response = await fetchAadhaarService(aadharNo, dob);
      set({ record: response.data, isResultOpen: true });
    } catch (err) {
      set({
        error: getAxiosErrorMessage(err, AadharMessages.ERROR_FETCH_FAILED),
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
