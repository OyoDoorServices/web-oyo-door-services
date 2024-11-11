import express from "express";
import { otpSendToUser, verifyOtpToUser } from "../controllers/User";


const app = express.Router();

app.post("/send-otp", otpSendToUser)  // /api/v1/user/send-otp
app.post("/verify-otp", verifyOtpToUser)  // /api/v1/user/verify-otp


export default app;