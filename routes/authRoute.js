import express from "express";
import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfile,
  getOrders,
  getAllOrders,
  orderStatus,
  getAllUsers,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing

//Register || Method POST
router.post("/register", registerController);

//Login || Method POST
router.post("/login", loginController);

//protected user route
router.get('/user-auth', requireSignIn, (req,res)=>{
  res.status(200).send({ ok: true});
})

//protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
  res.status(200).send({ ok: true});
})

//forgot-password || POST
router.post('/forgot-password',forgotPasswordController);

// profile || PUT
router.put('/profile', requireSignIn, updateProfile);

// profile || GET
router.get('/get-orders', requireSignIn, getOrders);

// profile || GET
router.get('/all-orders', requireSignIn, isAdmin, getAllOrders);

// profile || PUT
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatus);

// get users || GET
router.get('/get-users', requireSignIn, isAdmin, getAllUsers);

export default router;
