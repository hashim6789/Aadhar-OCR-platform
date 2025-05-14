import { z } from "zod";
export const uploadSchema = z.object({
  frontImage: z
    .instanceof(File)
    .refine((file) => file?.type.startsWith("image/"), {
      message: "Front image must be a valid image file (PNG, JPEG).",
    }),
  backImage: z
    .instanceof(File)
    .refine((file) => file?.type.startsWith("image/"), {
      message: "Back image must be a valid image file (PNG, JPEG).",
    }),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

// Form schema with zod validation
export const fetchSchema = z
  .object({
    aadharNo: z
      .string()
      .regex(/^\d{12}$/, "Aadhar number must be exactly 12 digits")
      .min(12, "Aadhar number must be 12 digits")
      .max(12, "Aadhar number must be 12 digits"),
    year: z
      .string()
      .regex(/^\d{4}$/, "Year must be a 4-digit number")
      .refine(
        (val) => {
          const year = parseInt(val);
          const currentYear = new Date().getFullYear();
          return year >= 1900 && year <= currentYear;
        },
        {
          message: `Year must be between 1900 and ${new Date().getFullYear()}`,
        }
      ),
    month: z
      .string()
      .regex(/^\d{1,2}$/, "Month must be a number")
      .refine(
        (val) => {
          const month = parseInt(val);
          return month >= 1 && month <= 12;
        },
        {
          message: "Month must be between 1 and 12",
        }
      ),
    day: z
      .string()
      .regex(/^\d{1,2}$/, "Day must be a number")
      .refine(
        (val) => {
          const day = parseInt(val);
          return day >= 1 && day <= 31;
        },
        {
          message: "Day must be between 1 and 31",
        }
      ),
  })
  .refine(
    (data) => {
      const { year, month, day } = data;
      const date = new Date(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
      // Check if date is valid (e.g., not Feb 30)
      return (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() + 1 === parseInt(month) &&
        date.getDate() === parseInt(day)
      );
    },
    {
      message: "Invalid date",
      path: ["day"], // Show error on day field
    }
  )
  .refine(
    (data) => {
      const date = new Date(
        `${data.year}-${data.month.padStart(2, "0")}-${data.day.padStart(
          2,
          "0"
        )}`
      );
      return date <= new Date();
    },
    {
      message: "Date of birth must be in the past",
      path: ["day"],
    }
  );

export type FetchFormData = z.infer<typeof fetchSchema>;
