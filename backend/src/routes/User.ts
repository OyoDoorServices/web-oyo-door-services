import express from "express";
import {
  changeRoleController,
  deleteUser,
  newUserController,
} from "../controllers/User";
import { adminOnly, adminOrDistributorOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/new", newUserController);
app.post("/change-role", adminOnly, changeRoleController);
app.delete("/deleteUser", adminOrDistributorOnly, deleteUser);

export default app;
