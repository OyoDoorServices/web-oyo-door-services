import express from "express";
<<<<<<< HEAD
import {
  changeRoleController,
  deleteUser,
  newUserController,
} from "../controllers/User";
=======
import { changeRoleController, deleteUser, newUserController, updateUserProfile,getAllUsers } from "../controllers/User";
>>>>>>> bb083b9616173bb8204405cb10b4ca1ade5bb116
import { adminOnly, adminOrDistributorOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/new", newUserController);
app.post("/change-role", adminOnly, changeRoleController);
<<<<<<< HEAD
app.delete("/deleteUser", adminOrDistributorOnly, deleteUser);
=======
app.delete("/deleteUser",adminOrDistributorOnly,deleteUser);
app.post("/updateUserProfile",updateUserProfile)
app.get("/getAllUsers",adminOrDistributorOnly,getAllUsers)
>>>>>>> bb083b9616173bb8204405cb10b4ca1ade5bb116

export default app;
