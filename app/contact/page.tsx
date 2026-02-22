"use client";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faComments,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
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
  return (
    <div className="wrapper">
      <div className="content grid grid-cols-1 md:grid-cols-[350px_1fr] lg:gap-5 md:gap-4 sm:gap-3 gap-2">
        <aside className="flex flex-col md:gap-4 sm:gap-3 gap-2">
          <h2 className="m-0!">Let&apos;s Connect!</h2>
          <div className="grid grid-cols-[45px_auto] justify-items-center items-center md:gap-6 sm:gap-5 gap-4">
            <FontAwesomeIcon
              className="md:text-4xl sm:text-3xl 2xl"
              icon={faComments}
            />
            <div className="w-auto">
              <span className="md:text-xl sm:text-lg text-base text-accent font-medium">
                E-mail Me
              </span>
              <p className="md:text-base sm:text-sm text-xs sm:mb-2 mb-1">
                Have a question, idea, or opportunity? Send me an email at
                nauffalcode@gmail.com — I’ll get back to you soon.
              </p>
              <a
                href="mailto:nauffalcode@gmail.com"
                className="md:text-base sm:text-sm text-xs text-main hover:underline"
              >
                nauffalcode@gmail.com
              </a>
            </div>
          </div>
          <div className="grid grid-cols-[45px_auto] justify-items-center items-center md:gap-6 sm:gap-5 gap-4">
            <FontAwesomeIcon
              className="md:text-4xl sm:text-3xl 2xl"
              icon={faPhone}
            />
            <div className="w-auto">
              <span className="md:text-xl sm:text-lg text-base text-accent font-medium">
                Chat/Call Me
              </span>
              <p className="md:text-base sm:text-sm text-xs sm:mb-2 mb-1">
                Got a question, a project idea, or just want to connect? I’m
                always up for a good conversation — whether it’s about code,
                collaboration, or coffee.
              </p>
              <a
                href="tel:+6287843902885"
                className="md:text-base sm:text-sm text-xs text-main hover:underline"
              >
                +62-878-4390-2885
              </a>
            </div>
          </div>
        </aside>
        <form action="#" className="flex flex-col">
          <div>
            <h2 className="m-0!">
              Got ideas? I have got the skills.
              <br />
              Lets team up!
            </h2>
            <p className="md:text-xl sm:text-lg text-base">
              Tell me more about yourself and what is you got in your mind.
            </p>
          </div>
          <div className="flex flex-col sm:gap-2 gap-1 md:mt-4 mt-2 md:mb-2 mb-1">
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="username"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                className="md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 border-gray hover:border-secondary focus:border-accent rounded-[5px] transition-all duration-300 focus:outline-none"
                id="username"
                placeholder="Your name"
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="email"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                className="md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 border-gray hover:border-secondary focus:border-accent rounded-[5px] transition-all duration-300 focus:outline-none"
                id="email"
                placeholder="you@gmail.com"
                autoComplete="off"
                required
              />
            </div>
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="phone"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Phone
              </label>
              <input
                type="number"
                className="md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 border-gray hover:border-secondary focus:border-accent rounded-[5px] transition-all duration-300 focus:outline-none"
                id="phone"
                placeholder="Your phone number"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="message"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                className="md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 border-gray hover:border-secondary focus:border-accent rounded-[5px] transition-all duration-300 focus:outline-none resize-none h-32"
                placeholder="Tell us about the project..."
                required
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:mt-4 mt-2 sm:mb-6 mb-4">
            <label
              className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs"
              htmlFor="frontend_dev"
            >
              <input type="checkbox" id="frontend_dev" className="hidden" />
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 aspect-square border-2 border-accent [input:checked~&]:bg-accent p-1 rounded-[0.5rem] text-white md:text-lg sm:text-base text-sm"
              />
              Front-end Development
            </label>
            <label
              className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs"
              htmlFor="backend_dev"
            >
              <input type="checkbox" id="backend_dev" className="hidden" />
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 aspect-square border-2 border-accent [input:checked~&]:bg-accent p-1 rounded-[0.5rem] text-white md:text-lg sm:text-base text-sm"
              />
              Back-end Development
            </label>
            <label
              className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs"
              htmlFor="fullstack_dev"
            >
              <input type="checkbox" id="fullstack_dev" className="hidden" />
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 aspect-square border-2 border-accent [input:checked~&]:bg-accent p-1 rounded-[0.5rem] text-white md:text-lg sm:text-base text-sm"
              />
              Full-stack Development
            </label>
            <label
              className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs"
              htmlFor="web_dev"
            >
              <input type="checkbox" id="web_dev" className="hidden" />
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 aspect-square border-2 border-accent [input:checked~&]:bg-accent p-1 rounded-[0.5rem] text-white md:text-lg sm:text-base text-sm"
              />
              Web Development
            </label>
            <label
              className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs"
              htmlFor="uiux_dev"
            >
              <input type="checkbox" id="uiux_dev" className="hidden" />
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 aspect-square border-2 border-accent [input:checked~&]:bg-accent p-1 rounded-[0.5rem] text-white md:text-lg sm:text-base text-sm"
              />
              UI/UX Development
            </label>
            <label
              className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs"
              htmlFor="db_dev"
            >
              <input type="checkbox" id="db_dev" className="hidden" />
              <FontAwesomeIcon
                icon={faCheck}
                className="h-5 aspect-square border-2 border-accent [input:checked~&]:bg-accent p-1 rounded-[0.5rem] text-white md:text-lg sm:text-base text-sm"
              />
              Database Development
            </label>
          </div>

          <button
            type="submit"
            className="bg-main text-white md:text-lg sm:text-base text-sm font-medium ml-auto sm:py-2 py-1.5 sm:px-4 px-3 rounded-[10px]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
