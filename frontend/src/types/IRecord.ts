export interface IRecord {
  _id: string;
  frontImageUrl: string;
  backImageUrl: string;
  aadharNo?: string;
  name?: string;
  dob?: Date;
  gender?: "male" | "female";
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ImageType = "frontImage" | "backImage";
