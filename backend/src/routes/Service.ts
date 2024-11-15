import express from "express";
import { adminOrDistributorOnly } from "../middlewares/auth";
import { newServiceController } from "../controllers/Service";

const app = express.Router();

app.post("/new",adminOrDistributorOnly, newServiceController); // /api/v1/service/new?{id}

export default app;
