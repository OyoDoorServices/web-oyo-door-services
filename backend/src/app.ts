import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./utils/features";

//importing routes
import userRoute from "./routes/User";
import serviceRoute from "./routes/Service";
import orderRoute from "./routes/Order";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());

connectDB(process.env.MONGO_URI as string);

app.get("/", (req, res) => {
  res.send("API working with /api/v1");
});

//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/order", orderRoute);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
