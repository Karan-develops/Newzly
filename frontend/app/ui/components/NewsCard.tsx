import { NewsCardProps } from "@/app/lib/definition";
import defaultImage from "@/public/assets/news.jpeg";
import { Globe2, MessageSquareShare } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

export function NewsCard({
  headline,
  description,
  category,
  publisher,
  date,
  image_link,
  news_link,
}: NewsCardProps): JSX.Element {
  const dispDate = new Date(parseInt(date, 10));
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const fomrmattedDate: string = Intl.DateTimeFormat("en-US", options).format(
    dispDate
  ) as string;

  return (
    <div className="pb-[2px] bg-white-200 shadow-2xl rounded-lg flex flex-col gap-y-3 w-[300px] sm:w-[280px] md::w-[320px] items-center h-[470px] relative hover:scale-105 duration-300">
      <div className="h-[21rem] w-auto flex overflow-hidden items-center">
        <img
          src={image_link}
          className="rounded-t-lg pointer-events-none w-auto h-auto"
          alt="news_image"
          height={320}
          width={320}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage.src;
          }}
        />
      </div>
      <div className="px-3 h-full flex flex-col justify-between ">
        <div className="flex flex-col">
          <p className="flex flex-row items-center gap-x-1">
            <MessageSquareShare className="text-slate-700 " />
            <span className="text-blue-600 animate-pulse text-sm font-bold type-font select-none">
              {category} - News
            </span>
          </p>
          <Link href={news_link}>
            <h1 className="title-font mt-1">
              {headline.split(/\s+/).filter((element) => {
                return element.length !== 0;
              }).length > 15
                ? headline.slice(0, 93) + "..."
                : headline}
            </h1>
          </Link>
          <p className="description-font mt-6">
            {description.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length > 15
              ? description.slice(0, 110) + "..."
              : description}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="w-full rounded-xl p-0 h-[1.5px] bg-slate-400"></div>
          <div className="items-center justify-between py-1 flex flex-row">
            <div className="text-2xl font-date">{fomrmattedDate}</div>
            <div className="flex flex-row items-center gap-2">
              <div className="w-fit h-fit">
                <p className="w-fit h-fit text-sm font-source">{publisher}</p>
              </div>
              <div className="source-link">
                <Link href={news_link}>
                  <Globe2 className="text-xl active:scale-75 duration-100" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
