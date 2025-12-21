import express from "express";
import {
  adminLogin,
  loginWithOtp,
  logout,
  register,
  sendLoginOtp,
} from "../../controllers/auth/auth.js";
import { usersCreate } from "../../utils/modules.js";
import verify from "../../utils/verifyToken.js";
// import  brokerUserController from "../../controllers/broker/brokerUserController.cjs";


const router = express.Router();

router.post("/v1/auth/register", usersCreate, verify, register);
// router.post("/v1/auth/login", login);
router.post("/v1/auth/send-login-otp", sendLoginOtp);
router.post("/v1/auth/login-with-otp", loginWithOtp);
router.post("/v1/auth/logout", logout);
// router.post('/v1/auth/brokeruser', createBrokerUser)

//For customer
router.post("/v1/customer/auth/register", register);
router.post('/v1/auth/admin/login', adminLogin)

export default router;
