
import mongoose, { Schema, Document } from "mongoose";

export interface IMarriageFormSub extends Document {
  // Groom Information
  groomFirstName: string;
  groomLastName: string;
  groomDateOfBirth: string;
  groomNationalId: string;
  groomNationality: string;
  groomOccupation: string;
  groomPhone: string;

  // Bride Information
  brideFirstName: string;
  brideLastName: string;
  brideDateOfBirth: string;
  brideNationalId: string;
  brideNationality: string;
  brideOccupation: string;
  bridePhone: string;

  // Marriage Details
  dateOfMarriage: string;
  placeOfMarriage: string;
  marriageType: string;
  witness1Name: string;
  witness1NationalId: string;
  witness2Name: string;
  witness2NationalId: string;

  // Address
  province: string;
  district: string;
  municipality: string;
  ward: string;

  // Contact & Additional
  contactPhone: string;
  contactEmail: string;
  remarks: string;

  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

const MarriageFormSubSchema = new Schema<IMarriageFormSub>(
  {
    // Groom Information
    groomFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    groomLastName: {
      type: String,
      required: true,
      trim: true,
    },
    groomDateOfBirth: {
      type: String,
      required: true,
    },
    groomNationalId: {
      type: String,
      required: true,
      trim: true,
    },
    groomNationality: {
      type: String,
      required: true,
      trim: true,
    },
    groomOccupation: {
      type: String,
      default: "",
      trim: true,
    },
    groomPhone: {
      type: String,
      required: true,
      trim: true,
    },

    // Bride Information
    brideFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    brideLastName: {
      type: String,
      required: true,
      trim: true,
    },
    brideDateOfBirth: {
      type: String,
      required: true,
    },
    brideNationalId: {
      type: String,
      required: true,
      trim: true,
    },
    brideNationality: {
      type: String,
      required: true,
      trim: true,
    },
    brideOccupation: {
      type: String,
      default: "",
      trim: true,
    },
    bridePhone: {
      type: String,
      required: true,
      trim: true,
    },

    // Marriage Details
    dateOfMarriage: {
      type: String,
      required: true,
    },
    placeOfMarriage: {
      type: String,
      required: true,
      trim: true,
    },
    marriageType: {
      type: String,
      required: true,
      trim: true,
    },
    witness1Name: {
      type: String,
      required: true,
      trim: true,
    },
    witness1NationalId: {
      type: String,
      required: true,
      trim: true,
    },
    witness2Name: {
      type: String,
      required: true,
      trim: true,
    },
    witness2NationalId: {
      type: String,
      required: true,
      trim: true,
    },

    // Address
    province: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    municipality: {
      type: String,
      required: true,
      trim: true,
    },
    ward: {
      type: String,
      required: true,
      trim: true,
    },

    // Contact & Additional
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },
    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    // Admin approval status
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const MarriageFormSub = mongoose.model<IMarriageFormSub>(
  "MarriageFormSub",
  MarriageFormSubSchema
);

export default MarriageFormSub;
