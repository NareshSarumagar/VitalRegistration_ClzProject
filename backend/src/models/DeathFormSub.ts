
import mongoose, { Schema, Document } from "mongoose";

export interface IDeathFormSub extends Document {
  // Deceased Information
  deceasedFirstName: string;
  deceasedLastName: string;
  gender: string;
  dateOfBirth: string;
  dateOfDeath: string;
  timeOfDeath: string;
  placeOfDeath: string;
  ageAtDeath: string;
  causeOfDeath: string;
  nationality: string;
  occupation: string;

  // Informant (person reporting)
  informantFullName: string;
  informantRelation: string;
  informantNationalId: string;
  informantPhone: string;

  // Address of Deceased
  province: string;
  district: string;
  municipality: string;
  ward: string;

  // Additional
  hospitalName: string;
  doctorName: string;
  remarks: string;

  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
}

const DeathFormSubSchema = new Schema<IDeathFormSub>(
  {
    // Deceased Information
    deceasedFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    deceasedLastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    dateOfDeath: {
      type: String,
      required: true,
    },
    timeOfDeath: {
      type: String,
      default: "",
    },
    placeOfDeath: {
      type: String,
      required: true,
      trim: true,
    },
    ageAtDeath: {
      type: String,
      default: "",
    },
    causeOfDeath: {
      type: String,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      default: "Nepali",
      trim: true,
    },
    occupation: {
      type: String,
      default: "",
      trim: true,
    },

    // Informant
    informantFullName: {
      type: String,
      required: true,
      trim: true,
    },
    informantRelation: {
      type: String,
      required: true,
      trim: true,
    },
    informantNationalId: {
      type: String,
      required: true,
      trim: true,
    },
    informantPhone: {
      type: String,
      required: true,
      trim: true,
    },

    // Address of Deceased
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

    // Additional
    hospitalName: {
      type: String,
      default: "",
      trim: true,
    },
    doctorName: {
      type: String,
      default: "",
      trim: true,
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

const DeathFormSub = mongoose.model<IDeathFormSub>(
  "DeathFormSub",
  DeathFormSubSchema
);

export default DeathFormSub;
