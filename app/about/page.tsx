"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";

export default function AboutPage() {
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
      <div className="content">
        <span className="text-5xl text-justify">
          Hi! I'm Naufal, a <b>full-stack web developer</b> passionate about
          coding. I specialize in <b>creating minimalist designs</b> using
          <i> frameworks</i> and <i>libraries</i>. I love crafting{" "}
          <b>user-friendly websites</b> that showcase my work and connect with
          others. Thank you for visiting my portfolio!
        </span>
        <Swiper
          className="my-10 pb-10!"
          spaceBetween={10}
          slidesPerView={6}
          navigation={false}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loop={true}
          modules={[Pagination]}
        >
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/html.png"
              alt="HTML"
              width={100}
              height={100}
            />
            <span className="font-medium ">HTML</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/css.png"
              alt="CSS"
              width={100}
              height={100}
            />
            <span className="font-medium ">CSS</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/bootstrap.png"
              alt="Bootstrap"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">Bootstrap</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/tailwind-css.png"
              alt="Tailwind CSS"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">Tailwind CSS</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/javascript.png"
              alt="JavaScript"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">JavaScript</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/react.png"
              alt="React.js"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">React.js</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/next-js.png"
              alt="Next.js"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">Next.js</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/express-js.png"
              alt="Express.js"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">Express.js</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/node-js.png"
              alt="Node.js"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">Node.js</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/php.png"
              alt="PHP"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">PHP</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/python.png"
              alt="Python"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">Python</span>
          </SwiperSlide>
          <SwiperSlide className="flex! flex-col justify-center items-center h-[141.66px]! shadow-sm rounded-[10px]">
            <Image
              src="/images/socmed/django.png"
              alt="Django"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-medium ">Django</span>
          </SwiperSlide>
        </Swiper>
        <p className="font-medium text-xl text-accent text-center">
          - One step closer to the dream -
        </p>
      </div>
    </div>
  );
}
