import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProductPhoto,
  getProduct,
  getProducts,
  updateProduct,
  productFilter,
  productCount,
  productList,
  productSearch,
  productRelated,
  productCategory,
  placeOrder,
} from "../controllers/productController.js";
import formidableMiddleware from 'express-formidable';

const router = express.Router();

// create product || POST
router.post("/create-product", requireSignIn, isAdmin, formidableMiddleware(), createProduct);

// get all product || GET
router.get("/get-products", formidableMiddleware(), getProducts );

// get single product || GET
router.get("/get-product/:slug", formidableMiddleware(), getProduct );

// get product photo || GET
router.get("/product-photo/:pid", formidableMiddleware(), getProductPhoto );

// delete product || DELETE
router.delete("/delete-product/:id", requireSignIn, isAdmin, formidableMiddleware(), deleteProduct);

// update product || UPDATE
router.put("/update-product/:id", requireSignIn, isAdmin, formidableMiddleware(), updateProduct);

// filter products || POST
router.post("/product-filters", productFilter);

// product count || GET
router.get("/product-count", productCount);

// product list || GET
router.post("/product-list/:page", productList);

// product search || GET
router.get("/search/:keyword", productSearch);

// product search || GET
router.get("/related-product/:pid/:cid", productRelated);

// product category || GET
router.get("/product-category/:slug", productCategory);

// place-order || POST
router.post('/place-order', requireSignIn, placeOrder);

export default router;