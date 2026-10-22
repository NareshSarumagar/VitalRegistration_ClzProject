import { Router } from "express";

import {
  createBirthFormSub,
  getAllBirthFormSubs,
  getBirthFormSubById,
  updateBirthFormSub,
  deleteBirthFormSub,
} from "../controllers/BirthFormSub";

const router = Router();

// POST: Submit a new birth registration form
router.post("/", createBirthFormSub);

// GET: Retrieve all birth registration forms (Admin dashboard)
router.get("/", getAllBirthFormSubs);

// GET: Retrieve a single birth registration form by ID
router.get("/:id", getBirthFormSubById);

// PUT: Update a birth registration form by ID
router.put("/:id", updateBirthFormSub);

// DELETE: Delete a birth registration form by ID
router.delete("/:id", deleteBirthFormSub);

export default router;