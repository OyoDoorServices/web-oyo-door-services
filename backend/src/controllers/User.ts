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
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try { 
    const { targetId } = req.body;   

    // Ensure the targetId is provided
    if (!targetId) {
      return res.status(400).json({
        success: false,
        message: "Target user ID must be provided",
      });
    }

    
    const targetUser = await User.findById(targetId);
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "No user exists with the provided ID",
      });
    }

    
    await User.findByIdAndDelete(targetId);

    return res.status(200).json({
      success: true,
      message: `${targetUser.name}'s account has been deleted`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the user",
    });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.query; // ID of the authenticated user
    const { newname, newemail, newphoneno, newpincode } = req.body; // Fields to update
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
    if (newpincode) user.Pincode = newpincode;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.query; 
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Authenticated user ID must be provided",
      });
    }

    // Find the authenticated user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Authenticated user not found",
      });
    }

    let users;

    // Check the role of the authenticated user
    if (user.role === "admin") {
      users = await User.find(); // Fetch all users
    } else if (user.role === "distributor") {
      users = await User.find({ pincode: user.Pincode }); // Fetch users with matching pincode
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this data",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving users",
    });
  }
};
