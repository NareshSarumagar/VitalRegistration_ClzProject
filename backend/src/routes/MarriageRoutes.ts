
import { Router } from "express";

import {
  createMarriageForm,
  getAllMarriageForms,
  getMarriageFormById,
  updateMarriageFormStatus,
  deleteMarriageForm,
} from "../controllers/MarriageFormSub";

const router = Router();

// POST: Submit a new marriage registration form
router.post("/", createMarriageForm);

// GET: Retrieve all marriage registration forms
router.get("/", getAllMarriageForms);

// GET: Retrieve a single marriage registration form by ID
router.get("/:id", getMarriageFormById);

// PATCH: Approve or reject a marriage registration form
router.patch("/:id/status", updateMarriageFormStatus);

// DELETE: Delete a marriage registration form
router.delete("/:id", deleteMarriageForm);

export default router;
