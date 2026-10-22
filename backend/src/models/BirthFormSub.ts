import mongoose, { Schema, Document } from "mongoose";

export interface IBirthFormSub extends Document {
  childFirstName: string;
  childLastName: string;
  gender: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  motherFullName: string;
  motherNationalId: string;
  fatherFullName: string;
  fatherNationalId: string;
  province: string;
  district: string;
  municipality: string;
  ward: string;
  contactPhone: string;
  contactEmail: string;
  remarks: string;
}

const BirthFormSubSchema: Schema<IBirthFormSub> = new Schema(
  {
    childFirstName: {
      type: String,
      required: true,
      trim: true,
    },
    childLastName: {
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
      type: Date,
      required: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    motherFullName: {
      type: String,
      required: true,
      trim: true,
    },
    motherNationalId: {
      type: String,
      required: true,
      trim: true,
    },
    fatherFullName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherNationalId: {
      type: String,
      required: true,
      trim: true,
    },
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
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "birthformsubs",
  }
);

const BirthFormSub =
  mongoose.models.BirthFormSub ||
  mongoose.model<IBirthFormSub>("BirthFormSub", BirthFormSubSchema);

export default BirthFormSub;