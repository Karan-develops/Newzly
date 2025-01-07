"use client";

import Image from "next/image";
import backgroundImage from "@/public/assets/hero-bg.png";
import showup_1 from "@/public/assets/showup-1.png";
import showup_2 from "@/public/assets/showup-2.png";

const Hero = () => {
  return (
    <div className="bg-font-view relative w-full">
      <div className="image h-fit w-full">
        <Image
          src={backgroundImage}
          alt="backgound"
          className="w-full object-cover pointer-events-none opacity-90 md:h-[700px] h-[850px]"
          priority
        />
        <div className="text z-30 text-font-frontview-hero absolute md:top-0 bottom-0 flex flex-col justify-center pointer-events-none transform top-[60%] left-[10%] w-80 md:w-96 mt-6 mb-4 pb-6 gap-y-14 text-[1.6rem] md:text-3xl right-5 md:tracking-wide sm:w-[380px]">
          <div className="text-white font-hero-head select-none">
            Newzly <span className="font-sans">!</span>{" "}
          </div>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#EE9CA7] to-[#FFDDE1] leading-tight font-hero-description text-wrap animate-pulse">
            Where Stories Unfold, and News Takes Flight. Stay Connected, Stay
            Informed.
          </div>
        </div>
        <div className="image-1 z-10 w-fit absolute md:top-28 top-24  md:left-[60%] rotate-12 border-8 rounded-md shadow-2xl shadow-green-600 left-5">
          <Image
            src={showup_1}
            alt="bg-text-1"
            className="object-cover w-60 h-fit pointer-events-none"
          />
        </div>
        <div className="image-2 z-20 absolute md:top-52 top-40 md:right-28 right-8 -rotate-12 border-8 rounded-md shadow-2xl shadow-purple-600 w-fit">
          <Image
            src={showup_2}
            alt="bg-text-2"
            className="object-cover w-60 h-fit pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
