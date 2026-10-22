
import { Router } from "express";

import {
  createDeathForm,
  getAllDeathForms,
  getDeathFormById,
  updateDeathFormStatus,
  deleteDeathForm,
} from "../controllers/DeathFormSub";

const router = Router();

// POST: Submit a new death registration form
router.post("/", createDeathForm);

// GET: Retrieve all death registration forms
router.get("/", getAllDeathForms);

// GET: Retrieve a single death registration form by ID
router.get("/:id", getDeathFormById);

// PATCH: Approve or reject a death registration form
router.patch("/:id/status", updateDeathFormStatus);

// DELETE: Delete a death registration form
router.delete("/:id", deleteDeathForm);

export default router;
