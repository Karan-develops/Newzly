import mongoose from "mongoose";

const news = mongoose.Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
    },
    date: {
      type: String,
      required: true,
      default: Date.now,
    },
    image_link: {
      type: String,
      unique: true,
    },
    news_link: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "news",
  }
);

const News = mongoose.model("News", news);

export default News;
