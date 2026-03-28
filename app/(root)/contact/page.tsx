"use client";

import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faComments,
  faCheck,
  // faWhatsapp,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
  /* LOADING */
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  });

  // Track form submission for validation
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Checkbox states
  const [services, setServices] = useState({
    frontend_dev: false,
    backend_dev: false,
    fullstack_dev: false,
    web_dev: false,
    uiux_dev: false,
    db_dev: false,
  });

  // Your WhatsApp number (international format without +)
  const WHATSAPP_NUMBER = "6287843902885";

  // Check if field has error (empty and submitted)
  const hasError = (field) => {
    return isSubmitted && !formData[field];
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setServices((prev) => ({ ...prev, [id]: checked }));
  };

  // Open WhatsApp with message
  const openWhatsApp = (message) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Check if required fields are filled
    if (!formData.username || !formData.email || !formData.message) {
      return; // Don't submit if required fields are empty
    }

    // Build selected services string
    const selectedServices = Object.entries(services)
      .filter(([_, isChecked]) => isChecked)
      .map(([key, _]) => {
        const labels = {
          frontend_dev: "Front-end Development",
          backend_dev: "Back-end Development",
          fullstack_dev: "Full-stack Development",
          web_dev: "Web Development",
          uiux_dev: "UI/UX Development",
          db_dev: "Database Development",
        };
        return labels[key];
      })
      .join(", ");

    // Construct WhatsApp message
    const message = `
*New Inquiry from Portfolio Website*

*Name:* ${formData.username}
*Email:* ${formData.email}
*Phone:* ${formData.phone || "Not provided"}

*Services Interested In:* ${selectedServices || "Not specified"}

*Message:*
${formData.message}
    `.trim();

    openWhatsApp(message);

    // Reset form after submission
    setIsSubmitted(false);
    setFormData({
      username: "",
      email: "",
      phone: "",
      message: "",
    });
    setServices({
      frontend_dev: false,
      backend_dev: false,
      fullstack_dev: false,
      web_dev: false,
      uiux_dev: false,
      db_dev: false,
    });
  };

  // Quick WhatsApp button handler
  const handleQuickChat = () => {
    const message = `Hi Nauffal! I visited your portfolio and I'm interested in your services. Let's connect!`;
    openWhatsApp(message);
  };

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
        <form onSubmit={handleSubmit} className="flex flex-col">
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
          <div className="flex flex-col sm:gap-2 gap-1 md:mt-4 mt-2 sm:mb-4 mb-2">
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="username"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 rounded-[5px] transition-all duration-300 focus:outline-none ${
                  hasError("username")
                    ? "border-red-500 bg-red-50"
                    : "border-gray hover:border-secondary focus:border-accent"
                }`}
                id="username"
                placeholder="Your name"
                autoComplete="off"
                value={formData.username}
                onChange={handleInputChange}
              />
              {hasError("username") && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
            </div>
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="email"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className={`md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 rounded-[5px] transition-all duration-300 focus:outline-none ${
                  hasError("email")
                    ? "border-red-500 bg-red-50"
                    : "border-gray hover:border-secondary focus:border-accent"
                }`}
                id="email"
                placeholder="you@gmail.com"
                autoComplete="off"
                value={formData.email}
                onChange={handleInputChange}
              />
              {hasError("email") && (
                <span className="text-red-500 text-xs">Email is required</span>
              )}
            </div>
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="phone"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Phone
              </label>
              <input
                type="tel"
                className="md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 border-gray hover:border-secondary focus:border-accent rounded-[5px] transition-all duration-300 focus:outline-none"
                id="phone"
                placeholder="Your phone number"
                autoComplete="off"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col sm:gap-1 gap-0.5">
              <label
                htmlFor="message"
                className="text-main md:text-lg sm:text-base text-sm font-semibold"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                className={`md:text-base sm:text-sm text-xs sm:py-2 py-1.5 sm:px-4 px-3 border-2 rounded-[5px] transition-all duration-300 focus:outline-none resize-none h-32 ${
                  hasError("message")
                    ? "border-red-500 bg-red-50"
                    : "border-gray hover:border-secondary focus:border-accent"
                }`}
                placeholder="Tell us about the project..."
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              {hasError("message") && (
                <span className="text-red-500 text-xs">Message is required</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-0.5 sm:mb-6 mb-4">
            <span className="text-main md:text-lg sm:text-base text-sm font-semibold">
              Services
            </span>
            <div className="grid grid-cols-2 gap-2">
              <label
                className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs cursor-pointer"
                htmlFor="frontend_dev"
              >
                <input
                  type="checkbox"
                  id="frontend_dev"
                  className="hidden"
                  checked={services.frontend_dev}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`h-5 aspect-square border-2 border-accent p-0.5 rounded-[0.5rem] md:text-lg sm:text-base text-sm flex items-center justify-center transition-all duration-300 ${
                    services.frontend_dev
                      ? "bg-accent text-white"
                      : "bg-transparent text-transparent"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                </span>
                Front-end Development
              </label>
              <label
                className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs cursor-pointer"
                htmlFor="backend_dev"
              >
                <input
                  type="checkbox"
                  id="backend_dev"
                  className="hidden"
                  checked={services.backend_dev}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`h-5 aspect-square border-2 border-accent p-0.5 rounded-[0.5rem] md:text-lg sm:text-base text-sm flex items-center justify-center transition-all duration-300 ${
                    services.backend_dev
                      ? "bg-accent text-white"
                      : "bg-transparent text-transparent"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                </span>
                Back-end Development
              </label>
              <label
                className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs cursor-pointer"
                htmlFor="fullstack_dev"
              >
                <input
                  type="checkbox"
                  id="fullstack_dev"
                  className="hidden"
                  checked={services.fullstack_dev}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`h-5 aspect-square border-2 border-accent p-0.5 rounded-[0.5rem] md:text-lg sm:text-base text-sm flex items-center justify-center transition-all duration-300 ${
                    services.fullstack_dev
                      ? "bg-accent text-white"
                      : "bg-transparent text-transparent"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                </span>
                Full-stack Development
              </label>
              <label
                className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs cursor-pointer"
                htmlFor="web_dev"
              >
                <input
                  type="checkbox"
                  id="web_dev"
                  className="hidden"
                  checked={services.web_dev}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`h-5 aspect-square border-2 border-accent p-0.5 rounded-[0.5rem] md:text-lg sm:text-base text-sm flex items-center justify-center transition-all duration-300 ${
                    services.web_dev
                      ? "bg-accent text-white"
                      : "bg-transparent text-transparent"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                </span>
                Web Development
              </label>
              <label
                className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs cursor-pointer"
                htmlFor="uiux_dev"
              >
                <input
                  type="checkbox"
                  id="uiux_dev"
                  className="hidden"
                  checked={services.uiux_dev}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`h-5 aspect-square border-2 border-accent p-0.5 rounded-[0.5rem] md:text-lg sm:text-base text-sm flex items-center justify-center transition-all duration-300 ${
                    services.uiux_dev
                      ? "bg-accent text-white"
                      : "bg-transparent text-transparent"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                </span>
                UI/UX Development
              </label>
              <label
                className="flex items-center sm:gap-2 gap-1 md:text-base sm:text-sm text-xs cursor-pointer"
                htmlFor="db_dev"
              >
                <input
                  type="checkbox"
                  id="db_dev"
                  className="hidden"
                  checked={services.db_dev}
                  onChange={handleCheckboxChange}
                />
                <span
                  className={`h-5 aspect-square border-2 border-accent p-0.5 rounded-[0.5rem] md:text-lg sm:text-base text-sm flex items-center justify-center transition-all duration-300 ${
                    services.db_dev
                      ? "bg-accent text-white"
                      : "bg-transparent text-transparent"
                  }`}
                >
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                </span>
                Database Development
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-main text-white md:text-lg sm:text-base text-sm font-medium ml-auto sm:py-2 py-1.5 sm:px-4 px-3 rounded-[10px] hover:bg-opacity-90 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}