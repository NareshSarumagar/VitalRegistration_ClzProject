import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import adminauthRoute from "./routes/adminauthRoute"
import { errorHandler } from "./middleware/errorHandler";
import BirthRoute from "./routes/BirthRoutes";
import DeathRoute from "./routes/DeathRoutes" 
import MarriageRoute from "./routes/MarriageRoutes"// Import the Birth routes

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin",adminauthRoute)
app.use("/api/auth", authRoutes);
app.use("/api/birth", BirthRoute); 
app.use("/api/death", DeathRoute); 
app.use("/api/marriage", MarriageRoute); // Use .default for ES module compatibility
app.use((_req, _res, next) => {
  success: false;
  message: "API endpoint not found.";
});
app.use(errorHandler);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});