import express from "express";
import {
  changeRoleController,
  deleteUserController,
  newUserController,
} from "../controllers/User";
import { adminOnly, adminOrDistributorOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/new", newUserController);
<<<<<<< HEAD
app.post("/change-role", adminOnly, changeRoleController);
<<<<<<< HEAD
app.delete("/deleteUser", adminOrDistributorOnly, deleteUserController);
=======
app.delete("/deleteUser",adminOrDistributorOnly,deleteUser);
app.post("/updateUserProfile",updateUserProfile)
app.get("/getAllUsers",adminOrDistributorOnly,getAllUsers)
>>>>>>> bb083b9616173bb8204405cb10b4ca1ade5bb116
=======
app.post("/change-role", adminOnly, change_role_Controller);
app.delete("/delete-user",adminOrDistributorOnly,delete_user_Controller);
app.post("/update-user-profile",update_user_profile_Controller)
app.get("/get-all-users",adminOrDistributorOnly,get_all_users_Controller)
>>>>>>> b2665901aa418e5d118dbccca60bdf1a0b3ff9f0

export default app;
