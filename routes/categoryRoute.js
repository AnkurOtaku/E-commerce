import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

// creating category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategory
);

// updating category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategory
);

// get all categories
router.get("/get-categories", getCategories);

// get single category
router.get("/get-category/:slug", getCategory);

// delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;