import { NextFunction, Request, Response } from "express";
import { User } from "../modals/User";
import ErrorHandler from "../utils/utility-class";

export const newUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, email, phoneNumber,Pincode, photo } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      if (photo) {
        user.photo = photo;
        user.save();
      }
      return res.status(200).json({
        success: true,
        message: `welcome, ${user.name}`,
        user,
      });
    }

    if (!name || !email || !phoneNumber || !Pincode)
      return next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
      name,
      email,
      phoneNumber,
      Pincode
    });

    return res.status(201).json({
      success: true,
      message: `Welcome ${user.name}`,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
