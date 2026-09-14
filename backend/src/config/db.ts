import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Warn if using local MongoDB
    if (
      MONGO_URI.includes("localhost") ||
      MONGO_URI.includes("127.0.0.1")
    ) {
      console.warn(
        "⚠️  Using LOCAL MongoDB. Set MONGO_URI to your Atlas connection string for production."
      );
    } else {
      console.log("🌐 Connecting to MongoDB Atlas...");
    }

    // Connection options (Atlas-optimized)
    const options: mongoose.ConnectOptions = {
      // Connection pool
      maxPoolSize: 10, // Max concurrent connections
      minPoolSize: 2, // Keep minimum connections warm

      // Timeouts
      serverSelectionTimeoutMS: 10000, // 10s to find a server
      socketTimeoutMS: 45000, // 45s idle socket timeout
      connectTimeoutMS: 10000, // 10s initial connect

      // Reliability
      retryWrites: true,
      retryReads: true,

      // Auto index (disable in production for performance)
      autoIndex: process.env.NODE_ENV !== "production",
    };

    const conn = await mongoose.connect(MONGO_URI, options);

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📚 Database: ${conn.connection.name}`);

    // Connection event listeners
    mongoose.connection.on("connected", () => {
      console.log("🔗 Mongoose connected to MongoDB Atlas");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  Mongoose disconnected from MongoDB Atlas");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("🛑 Mongoose connection closed (SIGINT)");
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await mongoose.connection.close();
      console.log("🛑 Mongoose connection closed (SIGTERM)");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ MongoDB Atlas connection failed:", error);

    // Exit process on initial failure (server can't run without DB)
    process.exit(1);
  }
};