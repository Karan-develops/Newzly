"use client";

import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.png";

const Navbar = () => {
  const repoLink: string = "https://github.com/Karan-develops/Newzly";
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "news", label: "News" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="relative w-fit flex items-center mt-4 lg:gap-10 border-2 rounded-2xl px-4 py-2 sm:px-7 sm:py-3 bg-[#27223b] border-emerald-500 gap-5">
      <div className="logo w-fit h-fit">
        <Image
          src={logo}
          width={30}
          height={30}
          alt="logo"
          className="rounded-full"
        />
      </div>
      <div>
        <ul className="text-white flex flex-row gap-5 lg:gap-6 items-center font-semibold">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="select-none hover:text-emerald-400 hover:scale-110 active:scale-95 duration-200"
            >
              <button
                className="text-sm sm:text-base"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
          <Link href={repoLink}>
            <li className="select-none hover:scale-110 active:scale-95 duration-200 hover:text-green-500">
              <Github />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
