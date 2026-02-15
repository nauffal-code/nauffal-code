"use client";

import { useMemo } from "react";
import BaseNav from "@/components/BaseNav";
import Jumbotron from "@/components/Jumbotron";

export default function Header() {
  const urlPathName = useMemo(
    function () {
      if (typeof window === "undefined") return "";
      const path = window.location.pathname;
      return path === "/"
        ? "Home"
        : path.slice(1).charAt(0).toUpperCase() + path.slice(1);
    },
    [typeof window === "undefined" ? null : window.location.pathname],
  );

  const showJumbotron = urlPathName === "Home";

  return (
    <header>
      <BaseNav />
      <Jumbotron isShown={showJumbotron} />
    </header>
  );
}
