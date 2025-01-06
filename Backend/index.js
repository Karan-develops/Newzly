import express from "express";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";

config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "200 Ok, Hello World :)",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
