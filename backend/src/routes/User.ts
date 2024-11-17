import express from "express";
import {
  changeRoleController,
  deleteUserController,
  getAllUsersController,
  newUserController,
  updateUserProfileController,
} from "../controllers/User";
import { adminOnly, adminOrDistributorOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/new", newUserController);
app.post("/change-role", adminOnly, changeRoleController);
app.delete("/delete-user", adminOrDistributorOnly, deleteUserController);
app.post("/update-user-profile", updateUserProfileController);
app.get("/get-all-users", adminOrDistributorOnly, getAllUsersController);

export default app;
