"use client";

import { useState, useEffect, JSX } from "react";
import { NewsCard } from "@/app/ui/components/NewsCard";
import { FetchNewsLoader } from "@/app/ui/loaders";
import { NewsCardProps } from "@/app/lib/definition";

export function News(): JSX.Element {
  const countriesList = [
    {
      country: "India",
      code: "in",
    },
    {
      country: "Brazil",
      code: "br",
    },
    {
      country: "Canada",
      code: "ca",
    },
    {
      country: "France",
      code: "fr",
    },
    {
      country: "Japan",
      code: "jp",
    },
    {
      country: "United States",
      code: "us",
    },
  ];

  const categoryList = [
    "world",
    "general",
    "nation",
    "buisness",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

  const [isFetching, setIsFetching] = useState(true);
  const [newsData, setNewsData] = useState<NewsCardProps[]>([]);
  const [allItemsFetched, setAllItemsFetched] = useState(false);
  const [page, setPage] = useState(1);
  const [configuration, setConfiguration] = useState({
    category: "world",
    country: "in",
    limit: 105,
  });

  const fetchData = async () => {
    setIsFetching(true);
    const API_URI = `http://localhost:5000/api/data/get-news?category=${configuration.category}&page=${page}&limit=${configuration.limit}&country=${configuration.country}`;

    const res = await fetch(API_URI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      if (data.total_pages <= page) {
        setAllItemsFetched(true);
        setIsFetching(false);
        return;
      }
      setNewsData((updateData) => [
        ...updateData,
        ...data.news, // Assuming `data.news` is an array of news items
      ]);

      setPage(page + 1);
      setIsFetching(false);
    } else {
      console.log("An Error Occurred");
      setIsFetching(false);
      throw new Error();
    }
  };

  useEffect(() => {
    setPage(1);
    setNewsData([]);
    setAllItemsFetched(false);
    fetchData();
  }, [configuration]);

  return (
    <div id="news" className="flex flex-col gap-2">
      <div className="sm:px-10 sm:py-2 flex flex-row w-full items-center justify-center sm:justify-start">
        <div className="flex flex-row w-fit gap-4">
          <div>
            <select
              className="rounded-lg p-2 border-[2px] border-blue-400 bg-gray-200 font-semibold hover:border-yellow-600"
              defaultValue={`world`}
              onChange={async (e) => {
                const target = e.target as HTMLSelectElement;
                setConfiguration((prev) => ({
                  ...prev,
                  category: target.value,
                }));
              }}
            >
              {categoryList.map((category) => (
                <option value={category} key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="rounded-lg p-2 border-[2px] border-blue-400 bg-gray-200 font-semibold hover:border-yellow-600"
              defaultValue={`in`}
              onChange={(e) => {
                const target = e.target as HTMLSelectElement;
                setConfiguration((prev) => ({
                  ...prev,
                  country: target.value,
                }));
              }}
            >
              {countriesList.map((countryData) => (
                <option value={countryData.code} key={countryData.code}>
                  {countryData.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap flex-row justify-evenly gap-4 p-5">
        {newsData.map((news) => (
          <NewsCard
            key={news._id}
            headline={news.headline}
            description={news.description}
            category={news.category}
            publisher={news.publisher}
            date={news.date}
            image_link={news.image_link}
            news_link={news.news_link}
          />
        ))}
      </div>
      <div className="justify-center items-center flex w-full">
        {isFetching && <FetchNewsLoader />}
      </div>
      {!allItemsFetched && !isFetching && (
        <div className="flex justify-center items-center w-full py-4">
          <button
            onClick={fetchData}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
