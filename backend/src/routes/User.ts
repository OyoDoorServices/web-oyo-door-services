import express from "express";
import { newUserController } from "../controllers/User";

const app = express.Router();

app.post("/new", newUserController);

export default app;
