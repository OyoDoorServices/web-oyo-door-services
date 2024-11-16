import { NextFunction, Request, Response } from "express";
import { User } from "../modals/User";
import ErrorHandler from "../utils/utility-class";

export const newUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, email, phoneNumber,pincode, photo } = req.body;
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

    if (!name || !email || !phoneNumber || !pincode)
      return next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
      name,
      email,
      phoneNumber,
      pincode
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

export const changeRoleController = async (  // admin only
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { role, email } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user exists with this email",
      });
    }

    return res.status(201).json({
      success: true,
      message: `${user.name}'s role changed to ${user.role}`,
    });
  } catch (error) {
    console.error(error);
  }
};



export const deleteUser = async (  // admin only
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.body;
    const user=await User.findOneAndDelete({id});

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user exists with this email",
      });
    }
    return res.status(201).json({
      success:true,
      message:`${user.name}'s account has been deleted`,
    });
    
   
  } catch (error) {
    console.error(error);
  }
};

