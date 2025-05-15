import { z } from 'zod';

export const fetchAadharSchema = z.object({
  aadharNo: z
    .string()
    .regex(/^\d{4}\s\d{4}\s\d{4}$/, 'Aadhar number must be in XXXX XXXX XXXX format')
    .min(14, 'Aadhar number must be in XXXX XXXX XXXX format')
    .max(14, 'Aadhar number must be in XXXX XXXX XXXX format'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of birth must be in YYYY-MM-DD format'),
});

export type IFetchAadharDTO = z.infer<typeof fetchAadharSchema>;
