import cron from "node-cron";

export const scheduleCronJobsUpdateData = () => {
  cron.schedule(
    "0,30,59 * * * *",
    async () => {
      const API_KEY = process.env.G_NEWS_API_KEY;
      const POST_URL = "http://localhost:5000/api/data/store-news";

      const countries = ["in", "br", "ca", "fr", "ie", "us"];
      const category = [
        "general",
        "world",
        "nation",
        "buisness",
        "technology",
        "entertainment",
        "sports",
        "science",
        "health",
      ];

      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      const randomCategory =
        category[Math.floor(Math.random() * category.length)];

      let options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      let formatter = new Intl.DateTimeFormat("en-GB", options);
      let formattedDate = formatter.format(new Date());

      console.log(`##### Cron jon Execution: ${formattedDate} #####`);

      try {
        // API URI
        const API_URI = `https://gnews.io/api/v4/top-headlines?category=${randomCategory}&lang=en&country=${randomCountry}&apikey=${API_KEY}`;

        await fetch(API_URI)
          .then((response) => {
            return response.json();
          })
          .then(async (data) => {
            const articles = data.articles;
            for (let i = 0; i < articles.length; i++) {
              const toBeSentData = {
                headline: articles[i]["title"],
                description: articles[i]["description"],
                category: randomCategory,
                country: randomCountry,
                publisher: articles[i]["source"]["name"],
                date: `${new Date(articles[i]["publishedAt"]).getTime()}`,
                image_link: articles[i]["image"],
                news_link: articles[i]["url"],
              };

              const res = await fetch(POST_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": process.env.AUTH_KEY,
                },
                body: JSON.stringify(toBeSentData),
              });
              console.log(
                "************ New Data Inserted Status *************"
              );
              console.log(res.status);
              console.log(
                "***************************************************"
              );
            }
          });
      } catch (error) {
        console.log("Some error occuredd");
        console.log(error);
      }

      formattedDate = formatter.format(new Date());
      console.log(`----- Execution Done at: ${formattedDate} -----`);
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
};
