"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import BaseNav from "@/components/BaseNav";
import Jumbotron from "@/components/Jumbotron";

export default function Header() {
  const pathname = usePathname();

  const urlPathName = useMemo(() => {
    return pathname === "/"
      ? "Home"
      : pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(1);
  }, [pathname]);

  const showJumbotron = urlPathName === "Home";

  return (
    <header>
      <BaseNav />
      <Jumbotron isShown={showJumbotron} />
    </header>
  );
}