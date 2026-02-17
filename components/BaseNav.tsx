"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

export default function BaseNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const [iconImg, setIconImg]=useState("")
  return (
    <nav
      className={
        isScrolled
          ? `main-nav bg-secondary text-white shadow-md`
          : `main-nav bg-transparent`
      }
    >
      <Link href="/" className="flex items-center">
        <Image
          className="md:w-[150px]! md:h-[30px]! sm:w-[125px]! sm:h-[25px]! w-[100px]!
      h-[20px]! object-cover"
          src={
            isScrolled
              ? `/images/logo/nobg/dark/lg-logo-dark-nobg.png`
              : `/images/logo/nobg/lg-logo-nobg.png`
          }
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <div className="flex items-center gap-4">
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
