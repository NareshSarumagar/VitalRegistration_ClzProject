import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens";
import { AuthRequest } from "../middleware/auth";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, phoneNumber, nationalId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber,
      nationalId,
      role: "citizen",
    });

    const payload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Registration successful",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        accessToken,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        accessToken,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken;
    if (!token) return res.status(401).json({ message: "Refresh token required" });

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.userId).select("+refreshToken");

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);

    res
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000,
      })
      .json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user.userId, { refreshToken: null });
    }
    res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        nationalId: user.nationalId,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};