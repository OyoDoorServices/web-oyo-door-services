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
export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.query;
    const { targetId } = req.body; 

    if (!id || !targetId) {
      return res.status(400).json({
        success: false,
        message: "Distributor or User not found",
      });
    }

    const distributor = await User.findById(id);
    if (!distributor) {
      return res.status(404).json({
        success: false,
        message: "Distributor not found",
      });
    }

    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (distributor.pincode == targetUser.pincode) {
      await User.findByIdAndDelete(targetId);
      return res.status(200).json({
        success: true,
        message: `User has been deleted`,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You are Unauthorized distributor for this user",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.query; 
    const { newname, newemail, newphoneno, newpincode } = req.body; 
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID must be provided",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
    if (newname) user.name = newname;
    if (newemail) user.email = newemail;
    if (newphoneno) user.phoneNumber = newphoneno;
    if (newpincode) user.pincode = newpincode;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.query; 

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Authenticated user not found",
      });
    }

    let users;

    if (user.role === "admin") {
      users = await User.find(); 
    }else{
      users = await User.find({ pincode: user.pincode });
    }
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error retrieving users:", error);
  }
};
