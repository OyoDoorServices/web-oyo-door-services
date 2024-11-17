import express from "express";
import { change_role_Controller, delete_user_Controller, get_all_users_Controller, newUserController, update_user_profile_Controller } from "../controllers/User";
import { adminOnly, adminOrDistributorOnly } from "../middlewares/auth";

const app = express.Router();

app.post("/new", newUserController);
app.post("/change-role", adminOnly, change_role_Controller);
app.delete("/delete-user",adminOrDistributorOnly,delete_user_Controller);
app.post("/update-user-profile",update_user_profile_Controller)
app.get("/get-all-users",adminOrDistributorOnly,get_all_users_Controller)

export default app;
