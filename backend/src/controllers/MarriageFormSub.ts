
import { Request, Response } from "express";
import mongoose from "mongoose";
import MarriageFormSub from "../models/MarriageFormSub";

// POST: Create a new marriage registration form
export const createMarriageForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const marriageForm = new MarriageFormSub(req.body);
    const savedForm = await marriageForm.save();

    res.status(201).json({
      success: true,
      message: "Marriage registration form submitted successfully.",
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
      message: "Failed to submit marriage registration form.",
    });
  }
};

// GET: Retrieve all marriage registration forms
export const getAllMarriageForms = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const forms = await MarriageFormSub.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve marriage registration forms.",
    });
  }
};

// GET: Retrieve a marriage registration form by ID
export const getMarriageFormById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid marriage registration form ID.",
      });
      return;
    }

    const form = await MarriageFormSub.findById(id);

    if (!form) {
      res.status(404).json({
        success: false,
        message: "Marriage registration form not found.",
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
      message: "Failed to retrieve marriage registration form.",
    });
  }
};

// PATCH: Approve or reject a marriage registration form
export const updateMarriageFormStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid marriage registration form ID.",
      });
      return;
    }

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      res.status(400).json({
        success: false,
        message: "Status must be PENDING, APPROVED, or REJECTED.",
      });
      return;
    }

    const updatedForm = await MarriageFormSub.findByIdAndUpdate(
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
        message: "Marriage registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Marriage registration form status updated to ${status}.`,
      data: updatedForm,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update marriage registration form status.",
    });
  }
};

// DELETE: Delete a marriage registration form by ID
export const deleteMarriageForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid marriage registration form ID.",
      });
      return;
    }

    const deletedForm = await MarriageFormSub.findByIdAndDelete(id);

    if (!deletedForm) {
      res.status(404).json({
        success: false,
        message: "Marriage registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Marriage registration form deleted successfully.",
      data: deletedForm,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete marriage registration form.",
    });
  }
};
