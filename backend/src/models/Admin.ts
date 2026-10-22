
import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUser } from '../types';

const adminSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'registrar'],
      default: 'registrar',
    },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function (
  entered: string
): Promise<boolean> {
  return bcrypt.compare(entered, this.password);
};

const Admin: Model<IUser> =
  mongoose.models.Admin ||
  mongoose.model<IUser>('Admin', adminSchema);

export default Admin;
