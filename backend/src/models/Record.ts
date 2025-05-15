import { Document, model, ObjectId, Schema } from 'mongoose';

export interface IRecord extends Document {
  _id: ObjectId;
  frontImageUrl: string;
  backImageUrl: string;
  aadharNo?: string;
  name?: string;
  dob?: Date;
  gender?: 'male' | 'female';
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const recordSchema = new Schema<IRecord>(
  {
    frontImageUrl: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+$/, 'Invalid URL for front image'],
    },
    backImageUrl: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+$/, 'Invalid URL for back image'],
    },

    aadharNo: {
      type: String,
      required: false,
      match: [/^\d{4}\s\d{4}\s\d{4}$/, 'Invalid Aadhar number format'],
    },
    name: {
      type: String,
      required: false,
      trim: true,
    },
    dob: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: false,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
recordSchema.index({ email: 1 });
recordSchema.index({ aadharNo: 1 }, { sparse: true, unique: true });

export const RecordModel = model<IRecord>('Record', recordSchema);
