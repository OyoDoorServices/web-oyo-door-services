import express from "express";
import {
  changeRoleController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  newUserController,
  updateUserProfileController,
} from "../controllers/User";
import { adminOnly, adminOrDistributorOnly } from "../middlewares/auth";

const app = express.Router();

app.get("/:id", getUserController);
app.post("/new", newUserController);
app.post("/change-role", adminOnly, changeRoleController);
app.delete("/delete-user", adminOrDistributorOnly, deleteUserController);
app.put("/update-user-profile", updateUserProfileController);
app.get("/get-all-users", adminOrDistributorOnly, getAllUsersController);

export default app;
