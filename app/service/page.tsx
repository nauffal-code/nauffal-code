"use client"

import { useState, useEffect } from "react";

export default function ServicePage() {
  /* LOADING */
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 bg-white">
        <p className="text-secondary text-lg font-medium">Loading...</p>
      </div>
    );
  }
  return <h1>Ini adalah halaman Jasa saya</h1>;
}
