import { Request, Response } from "express";
import mongoose from "mongoose";
import BirthFormSub from "../models/BirthFormSub";

// Submit a new birth registration form
export const createBirthFormSub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      childFirstName,
      childLastName,
      gender,
      dateOfBirth,
      placeOfBirth,
      motherFullName,
      motherNationalId,
      fatherFullName,
      fatherNationalId,
      province,
      district,
      municipality,
      ward,
      contactPhone,
      contactEmail,
      remarks,
    } = req.body;

    const birthForm = await BirthFormSub.create({
      childFirstName,
      childLastName,
      gender,
      dateOfBirth,
      placeOfBirth,
      motherFullName,
      motherNationalId,
      fatherFullName,
      fatherNationalId,
      province,
      district,
      municipality,
      ward,
      contactPhone,
      contactEmail,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Birth registration form submitted successfully.",
      data: birthForm,
    });
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.message,
      });
      return;
    }

    console.error("Create birth form error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit birth registration form.",
    });
  }
};

// Get all birth registration forms (Admin dashboard)
export const getAllBirthFormSubs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const birthForms = await BirthFormSub.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: birthForms.length,
      data: birthForms,
    });
  } catch (error: unknown) {
    console.error("Get birth forms error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve birth registration forms.",
    });
  }
};

// Get a single birth registration form by ID
export const getBirthFormSubById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid birth registration ID.",
      });
      return;
    }

    const birthForm = await BirthFormSub.findById(id);

    if (!birthForm) {
      res.status(404).json({
        success: false,
        message: "Birth registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: birthForm,
    });
  } catch (error: unknown) {
    console.error("Get birth form error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve birth registration form.",
    });
  }
};

// Update a birth registration form
export const updateBirthFormSub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid birth registration ID.",
      });
      return;
    }

    const birthForm = await BirthFormSub.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!birthForm) {
      res.status(404).json({
        success: false,
        message: "Birth registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Birth registration form updated successfully.",
      data: birthForm,
    });
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: error.message,
      });
      return;
    }

    console.error("Update birth form error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update birth registration form.",
    });
  }
};

// Delete a birth registration form
export const deleteBirthFormSub = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid birth registration ID.",
      });
      return;
    }

    const birthForm = await BirthFormSub.findByIdAndDelete(id);

    if (!birthForm) {
      res.status(404).json({
        success: false,
        message: "Birth registration form not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Birth registration form deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("Delete birth form error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete birth registration form.",
    });
  }
};