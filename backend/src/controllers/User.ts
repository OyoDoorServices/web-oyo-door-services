import { Request, Response } from "express";
import { SendOtpRequest, VerifyOtpRequest } from "../types/types";
import { client, serviceSid } from "../app";




export const otpSendToUser = async (req: Request<{}, {}, SendOtpRequest>, res: Response): Promise<any> => {
    let { phoneNumber } = req.body;  // Using typed 'phoneNumber' here
    if (!phoneNumber) return res.status(400).json({ message: 'Phone number required' });

    if (!phoneNumber.startsWith('+91')) {
        phoneNumber = `+91${phoneNumber}`;
    }

    try {

        const verification = await client.verify.v2.services(serviceSid!)
            .verifications.create({ to: phoneNumber, channel: 'sms' });

        return res.status(200).json({ message: 'OTP sent successfully', sid: verification.sid });
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
}


export const verifyOtpToUser = async (req: Request<{}, {}, VerifyOtpRequest>, res: Response): Promise<any> => {
    let { phoneNumber, otp } = req.body;  // Using typed 'phoneNumber' and 'otp' here
    if (!phoneNumber || !otp) return res.status(400).json({ message: 'Phone number and OTP required' });

    if (!phoneNumber.startsWith('+91')) {
        phoneNumber = `+91${phoneNumber}`;
    }
    try {
        const verificationCheck = await client.verify.v2.services(serviceSid!)
            .verificationChecks.create({ to: phoneNumber, code: otp });

        if (verificationCheck.status === 'approved') {
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
    }
}