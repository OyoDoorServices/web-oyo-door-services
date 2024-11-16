import express from "express";
import { changeRoleController, deleteUser, newUserController, updateUserProfile,getAllUsers } from "../controllers/User";
import { adminOnly, adminOrDistributorOnly } from "../middlewares/auth";
import { deleteModel } from "mongoose";

const app = express.Router();

app.post("/new", newUserController);
app.post("/change-role", adminOnly, changeRoleController);
app.delete("/deleteUser",adminOrDistributorOnly,deleteUser);
app.post("/updateUserProfile",updateUserProfile)
app.get("/getAllUsers",adminOrDistributorOnly,getAllUsers)

export default app;
