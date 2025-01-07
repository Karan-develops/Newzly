"use client";

import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.png";

const Navbar = () => {
  const repoLink: string = "https://github.com/karan-develops/newzly";
  return (
    <div className="relative nav-wrapper w-fit flex items-center mt-4 lg:gap-10 border-2 rounded-2xl px-4 py-2 sm:px-7 sm:py-3 bg-[#27223b] border-yellow-500 gap-5">
      <div className="logo w-fit h-fit">
        <Image src={logo} width={60} height={60} alt="logo" />
      </div>
      <div className="links-nav">
        <ul className="text-white flex flex-row gap-5 lg:gap-10 items-center font-semibold">
          <li className="select-none hover:scale-110 active:scale-95 duration-200">
            <button
              className="text-sm sm:text-base"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Home
            </button>
          </li>
          <li className="select-none hover:scale-110 active:scale-95 duration-200">
            <button
              className="text-sm sm:text-base"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("news")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              News
            </button>
          </li>
          <li className="select-none hover:scale-110 active:scale-95 duration-200 text-sm sm:text-base">
            <button
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact
            </button>
          </li>
          <Link href={repoLink}>
            <li className="select-none hover:scale-110 active:scale-95 duration-200">
              <Github />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
