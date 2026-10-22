
import { Request, Response } from "express";
import DeathFormSub from "../models/DeathFormSub";
import mongoose from "mongoose";

// POST: Submit a new death registration form
export const createDeathForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deathForm = new DeathFormSub(req.body);

    const savedForm = await deathForm.save();

    res.status(201).json({
      success: true,
      message: "Death registration form submitted successfully.",
      data: savedForm,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit death registration form.",
      error: error.message,
    });
  }
};

// GET: Retrieve all death registration forms
export const getAllDeathForms = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const forms = await DeathFormSub.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve death registration forms.",
      error: error.message,
    });
  }
};

// GET: Retrieve a death registration form by ID
export const getDeathFormById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid death registration form ID.",
      });
      return;
    }

    const form = await DeathFormSub.findById(id);

    if (!form) {
      res.status(404).json({
        success: false,
        message: "Death registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: form,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve death registration form.",
      error: error.message,
    });
  }
};

// PATCH: Approve or reject a death registration form
export const updateDeathFormStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid death registration form ID.",
      });
      return;
    }

    if (!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Status must be APPROVED, REJECTED, or PENDING.",
      });
      return;
    }

    const updatedForm = await DeathFormSub.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedForm) {
      res.status(404).json({
        success: false,
        message: "Death registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Death registration form status updated to ${status}.`,
      data: updatedForm,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update death registration form status.",
      error: error.message,
    });
  }
};

// DELETE: Delete a death registration form by ID
export const deleteDeathForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid death registration form ID.",
      });
      return;
    }

    const deletedForm = await DeathFormSub.findByIdAndDelete(id);

    if (!deletedForm) {
      res.status(404).json({
        success: false,
        message: "Death registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Death registration form deleted successfully.",
      data: deletedForm,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete death registration form.",
      error: error.message,
    });
  }
};
