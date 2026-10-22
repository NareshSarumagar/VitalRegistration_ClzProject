import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/Admin';

dotenv.config();

const seed = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const email = 'admin@registrar.com';
    const exists = await User.findOne({ email });

    if (exists) {
      console.log('⚠️  Admin already exists');
    } else {
      await User.create({
        name: 'Admin',
        email,
        password: 'password@123',
        role: 'admin',
      });
      console.log('✅ Admin created — email: admin@registrar.com | password: password@123');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seed error:', (err as Error).message);
    process.exit(1);
  }
};

seed();