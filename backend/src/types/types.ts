
export interface SendOtpRequest {
    phoneNumber: string;
  }
  
 export  interface VerifyOtpRequest {
    phoneNumber: string;
    otp: string;
  }