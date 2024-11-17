import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "../types/types";

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri)
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};


export const getBase64 = (file: Express.Multer.File) => {
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};

export const uploadToCloudinary = async (files: { buffer: Buffer; mimetype: string }[]) => {
  const promises = files.map((file) => {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      cloudinary.uploader.upload(base64String, (error, result) => {
        if (error) return reject(error);
        resolve(result!);
      });
    });
  });

  const result = await Promise.all(promises);
  return result.map((i) => ({
    public_id: i.public_id,
    url: i.secure_url,
  }));
};


export const deleteFromCloudinary = async (publicIds: string[]) => {
  const promises = publicIds.map((id) => {
    return new Promise<void>((resolve, reject) => {
      cloudinary.uploader.destroy(id, (error, result) => {
        if (error) return reject(error);
        resolve();
      });
    });
  });

  await Promise.all(promises);
};