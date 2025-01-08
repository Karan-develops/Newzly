import News from "../models/news.model.js";

export const getNews = async (req, res) => {  
  const category = req.query.category;
  const country = req.query.country;
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit), 25) || 25;
  const skip = (page - 1) * limit;

  const filter = {
    ...(category && { category }),
    ...(country && { country }),
  };
  
  try {
    const news = await News.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);
    
    const total = await News.countDocuments(filter);
  
    return res.status(200).json({
      page,
      total_pages: Math.ceil(total / limit),
      total_items: total,
      limit,
      news,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const storeNews = async (req, res) => {
  const {
    headline,
    description,
    category,
    country,
    publisher,
    image_link,
    news_link,
  } = req.body;

  try {
    await News.create({
      headline,
      description,
      category,
      country,
      publisher,
      image_link,
      news_link,
    });

    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const oldItems = await News.find().sort({ date: 1 }).limit(5).exec();
    const idsToDelete = oldItems.map((item) => item._id);

    await News.deleteMany({ _id: { $in: idsToDelete } });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
