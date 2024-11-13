import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  name: string;
  email: string;
  photo: string;
  phoneNumber: number;
  Pincode:number;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    email: {
      type: String,
      unique: [true, "Email id already exits"],
      required: [true, "Please enter Email"],
      validate: validator.default.isEmail,
    },
    phoneNumber: {
      type: Number,
      unique: [true, "Ph Number already exits"],
      required: [true, "Please enter Ph Number"],
      validate: {
        validator: function (v: number) {
          return /^\d{10}$/.test(v.toString());
        },
        message: "Phone Number must be exactly 10 digits",
      },
    },
    Pincode: {
      type:Number,
      required:[true,"please enter your area's pincode"],
      validate:{
        validator:function(pin:number){
          return /^\d{6}$/.test(pin.toString());            
        }
      }
    },
    photo: {
      type: String,
      required: [true, "Please add Photo"],
      default:
        "https://res.cloudinary.com/dsighkawi/image/upload/v1731401484/thumb_15951118880user_oihuo6.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", schema);
