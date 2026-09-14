import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "admin" | "registrar" | "citizen";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  nationalId?: string;
  isVerified: boolean;
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      enum: ["admin", "registrar", "citizen"],
      default: "citizen",
    },
    phoneNumber: { type: String, trim: true },
    nationalId: { type: String, unique: true, sparse: true, trim: true },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;