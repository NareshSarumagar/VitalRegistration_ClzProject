import { Router } from "express";
import { body } from "express-validator";
import rateLimit from "express-rate-limit";
import   {
  register,
  login,
  refresh,
  logout,
  getMe,
} from "../controllers/AuthController";
import { authenticate } from "../middleware/auth";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many attempts, please try again later",
});

const passwordRules = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[A-Z]/)
  .withMessage("Must contain an uppercase letter")
  .matches(/[a-z]/)
  .withMessage("Must contain a lowercase letter")
  .matches(/[0-9]/)
  .withMessage("Must contain a number");

router.post(
  "/register",
  authLimiter,
  [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
    passwordRules,
  ],
  register
);

router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post("/refresh", refresh);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

export default router;