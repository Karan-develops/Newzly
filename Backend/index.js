import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";

import dataRouter from "./routes/data.route.js";
import { scheduleCronJobsUpdateData } from "./scripts/update-data.js";
import { scheduleCronJobsDeleteData } from "./scripts/delete-data.js";

config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

await connectDB();

app.use("/api/data", dataRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "200 Ok, Hello World :)",
  });
});

scheduleCronJobsUpdateData();
scheduleCronJobsDeleteData();

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
