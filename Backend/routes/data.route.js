import express from "express";
import {
  deleteNews,
  getNews,
  storeNews,
} from "../controllers/data.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/get-news", getNews);

router.post("/store-news", protectRoute, storeNews);

router.delete("/delete-news", protectRoute, deleteNews);
