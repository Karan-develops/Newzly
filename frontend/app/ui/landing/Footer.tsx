"use client";

import Image from "next/image";
import React, { JSX, useState } from "react";
import shipImg from "@/public/assets/ship.png";
import { MessageSubmissionLoader } from "../loaders";
import logo from "@/public/assets/logo.png";
import Link from "next/link";
import { Github, Instagram, Linkedin, Snowflake, Twitter } from "lucide-react";

const Footer = (): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { href: "https://x.com/mrkaran000", icon: <Twitter /> },
    {
      href: "https://www.linkedin.com/in/karan-aggarwal-50a12b2b9/",
      icon: <Linkedin />,
    },
    { href: "https://github.com/Karan-develops", icon: <Instagram /> },
    { href: "https://www.instagram.com/karan_aggarwal_00/", icon: <Github /> },
  ];
  const linkGroups = [
    {
      links: ["About", "Impact", "Open Source"],
    },
    {
      links: ["Terms and Conditions", "Privacy Policy", "Cookie Policy"],
    },
  ];

  const handleFormSubmission: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email: string = formData.get("email") as string;
    const message: string = formData.get("message") as string;
    const POST_API_URI = "https://newzly.onrender.com/api/service/send-email";

    try {
      // Send message to creator
      let res = await fetch(POST_API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toName: "Karan",
          toEmail: "mrkaran2k5@gmail.com",
          subject: "A New Message from Newzly",
          message: `Hi Karan, someone with email: ${email}, have messaged you. Below is the message sent through the webiste: \n\n${message}\n\nYou can either respond or ignore the message\n\nTeam Newzly\nThe All in One News App`,
        }),
      });

      if (res.status != 200) {
        throw new Error();
      }
      // Send confirmation message to user
      res = await fetch(POST_API_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toName: "",
          toEmail: email,
          subject: "Newzly: Message Received !",
          message:
            "Hi,\nYour message have been successfully received and sent to creators. They will try to repond as soon as possible and will love to interact to you.\n\nTeam Newzly\n(This is auto-gnerated mail for successful confirmation.)",
        }),
      });
      if (res.status != 200) {
        throw new Error();
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.log(`Some Error Occured`,error);
      throw new Error();
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="static bg-gradient-to-tr sm:p-9 py-9 px-5 pt-14 sm:py-9 w-full h-fit from-[#1a1a1a] to-gray-700 rounded-sm flex flex-col gap-16">
      <div className="flex justify-around flex-wrap items-center gap-6 w-full h-fit">
        <div className="flex flex-col gap-4 w-fit h-fit">
          <p className="flex select-none text-green-500 w-fit h-fit">
            <Snowflake /> No subscription required
          </p>
          <p className="select-none text-white h-fit w-fit">
            Start using Newzly Today <span className="font-mono">!</span>
          </p>
          <form
            id="contact"
            onSubmit={handleFormSubmission}
            className="items-center flex flex-wrap flex-col gap-12 mt-2"
          >
            <input
              disabled={isSubmitted}
              required
              type="email"
              placeholder="Email"
              name="email"
              id=""
              className="bg-transparent border-b-2 border-gray-400 sm:w-80 w-72 h-10 outline-none text-white focus:border-blue-500 placeholder:text-slate-200"
            />
            <textarea
              disabled={isSubmitted}
              required
              placeholder="Message"
              name="message"
              id=""
              className="rounded-xl p-4 bg-transparent text-white border-2 border-gray-400 outline-none focus:border-blue-500 w-80 h-52 resize-none"
            ></textarea>
            <button
              disabled={isSubmitted}
              type="submit"
              className={`bg-[#d36868] w-[7.7rem] h-fit py-4 px-6 rounded-md flex justify-center items-center gap-2 text-white font-bold text-lg  transition-all duration-200 ${
                isSubmitted
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-[#d73434]"
              }`}
            >
              {isSubmitted ? <span>Sent 😊</span> : <span>Send</span>}
              {isSubmitting && <MessageSubmissionLoader />}
            </button>
          </form>
        </div>
        <div className="w-fit h-fit animate-pulse">
          <Image
            src={shipImg}
            alt="footer img"
            className="pointer-events-none"
            aria-hidden
          />
        </div>
      </div>
      <div className="flex gap-14 justify-normal lg:justify-evenly flex-wrap">
        <div className="select-none">
          <div className="w-fit h-fit">
            <Image
              src={logo}
              alt="logo"
              aria-hidden
              className="w-20 h-18 pointer-events-none"
            />
          </div>
          <div className="flex flex-col gap-5 w-fit h-fit text-white">
            <div>&#169; Newzly {new Date().getFullYear()}</div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6EA8D] to-[#FE90AF] flex flex-wrap w-80">
              Delivering news like never before. Enjoy the new way of reading.
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-x-9 gap-y-8 md:gap-x-11 md:gap-y-10 lg:gap-x-12 lg:gap-y-11 xl:gap-x-16 2xl:gap-x-24">
          {linkGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="text-sm sm:text-base flex flex-col gap-y-[5px]"
            >
              {group.links.map((link, linkIndex) => (
                <div
                  key={linkIndex}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
          <div className="text-sm sm:text-base flex flex-col gap-3">
            <div className="text-white text-xl font-bold select-none">
              Contact Us
            </div>
            <div className="text-slate-300 hover:text-[#EA8D8D]">
              <Link href="mailto:mrkaran2k5@gmail.com">
                mrkaran2k5@gmail.com
              </Link>
            </div>
            <div className="text-slate-300 flex flex-rows gap-4 cursor-pointer -mt-1">
              {socialLinks.map((social, index) => (
                <div key={index} className="text-lg hover:text-[#EA8D8D]">
                  <Link href={social.href}>{social.icon}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
