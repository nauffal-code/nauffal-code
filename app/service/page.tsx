"use client";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTv,
  faUserGear,
  faGlobe,
  faWandMagicSparkles,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

export default function ServicePage() {
  /* LOADING */
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div className="wrapper">
        <div className="content grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-8">
          <div className="flex flex-col">
            <FontAwesomeIcon
              className="md:text-2xl sm:text-xl text-lg text-secondary"
              icon={faTv}
            />
            <span className="font-semibold text-main md:text-2xl sm:text-xl text-lg mt-2 mb-2 pb-2 mx-auto border-b-2 border-accent">
              Front-end Development
            </span>
            <p className="text-secondary md:text-base sm:text-sm text-xs text-justify">
              I turn Figma dreams into real, clickable, fast-as-hell websites.
              Using React, Tailwind, and all the cool front-end magic, I craft
              sleek, responsive UIs that don’t just look good — they feel good.
              Your users deserve smooth vibes, and I deliver.
            </p>
          </div>
          <div className="flex flex-col">
            <FontAwesomeIcon
              className="md:text-2xl sm:text-xl text-lg text-secondary"
              icon={faUserGear}
            />
            <span className="font-semibold text-main md:text-2xl sm:text-xl text-lg mt-2 mb-2 pb-2 mx-auto border-b-2 border-accent">
              Back-end Development
            </span>
            <p className="text-secondary md:text-base sm:text-sm text-xs text-justify">
              I handle the behind-the-scenes chaos so your app runs smooth. From
              APIs that actually make sense to databases that don’t randomly
              crash, I build back-ends that are clean, scalable, and ready for
              anything — with Node, Express, and database wizardry in my
              toolkit.
            </p>
          </div>
          <div className="flex flex-col">
            <FontAwesomeIcon
              className="md:text-2xl sm:text-xl text-lg text-secondary"
              icon={faGlobe}
            />
            <span className="font-semibold text-main md:text-2xl sm:text-xl text-lg mt-2 mb-2 pb-2 mx-auto border-b-2 border-accent">
              Web Development
            </span>
            <p className="text-secondary md:text-base sm:text-sm text-xs text-justify">
              I build websites that don’t just exist — they slap. Front-end?
              Clean, fast, responsive. Back-end? Solid, secure, scalable.
              Full-stack web dev with modern tools like React, Tailwind, and
              Node. I turn ideas into dope, working products.
            </p>
          </div>
          <div className="flex flex-col">
            <FontAwesomeIcon
              className="md:text-2xl sm:text-xl text-lg text-secondary"
              icon={faWandMagicSparkles}
            />
            <span className="font-semibold text-main md:text-2xl sm:text-xl text-lg mt-2 mb-2 pb-2 mx-auto border-b-2 border-accent">
              UI/UX Development
            </span>
            <p className="text-secondary md:text-base sm:text-sm text-xs text-justify">
              I don’t just design pretty pixels — I create experiences that hit.
              Smooth UI, intuitive UX, no fluff. I go from mockups to live code
              using Figma + React + Tailwind like it’s second nature. If users
              vibe with it, I’ve done my job.
            </p>
          </div>
          <div className="flex flex-col">
            <FontAwesomeIcon
              className="md:text-2xl sm:text-xl text-lg text-secondary"
              icon={faDatabase}
            />
            <span className="font-semibold text-main md:text-2xl sm:text-xl text-lg mt-2 mb-2 pb-2 mx-auto border-b-2 border-accent">
              Database Development
            </span>
            <p className="text-secondary md:text-base sm:text-sm text-xs text-justify">
              I make sure your app’s brain doesn’t fry. With solid schema
              design, clean queries, and smooth API integration, I keep your
              data flowing — fast, reliable, and ready to scale. Mongo? SQL? Got
              it covered.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Ini adalah halaman Jasa saya</h1>;
}
