"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

interface NavProps {
  isShown: boolean;
}

export default function BaseNav({ isShown }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* RESPONSIVE SCREEN SIZE IMAGE SOURCE INCLUDING DARK AND LIGHT THEME */
  const [iconImg, setIconImg] = useState("");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIconImg(
          isScrolled
            ? "/images/logo/nobg/dark/lg-logo-dark-nobg.png"
            : "/images/logo/nobg/lg-logo-nobg.png",
        );
      } else if (window.innerWidth >= 640) {
        setIconImg(
          isScrolled
            ? "/images/logo/nobg/dark/md-logo-dark-nobg.png"
            : "/images/logo/nobg/md-logo-nobg.png",
        );
      } else {
        setIconImg(
          isScrolled
            ? "/images/logo/nobg/dark/sm-logo-dark-nobg.png"
            : "/images/logo/nobg/sm-logo-nobg.png",
        );
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isScrolled]);
  return (
    <nav
      className={
        isScrolled
          ? `main-nav bg-secondary text-white shadow-md`
          : `main-nav bg-transparent shadow-md`
      }
    >
      <Link href="/" className="flex items-center">
        <Image
          className="md:w-[150px]! md:h-[30px]! sm:w-[120px]! sm:h-[30px]! w-[45px]!
      h-[45px]! object-cover"
          src={iconImg}
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <div className="flex items-center md:gap-4 sm:gap-3 gap-2">
        <Link
          href="/about"
          className={
            isScrolled
              ? `underline-hover after:border-b-white text-xs sm:text-base`
              : `underline-hover after:border-b-black text-xs sm:text-base`
          }
        >
          About Me
        </Link>
        <Link href="/work" className="underline-hover text-xs sm:text-base">
          My Works
        </Link>
        <Link href="/service" className="underline-hover text-xs sm:text-base">
          My Services
        </Link>
        <Link href="/contact" className="underline-hover text-xs sm:text-base">
          Contact Me
        </Link>
      </div>
    </nav>
  );
}
