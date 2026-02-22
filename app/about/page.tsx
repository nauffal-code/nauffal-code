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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel
          semper orci, in facilisis justo. Suspendisse molestie gravida turpis
          placerat congue. Nam pulvinar facilisis augue vitae cursus. Interdum
          et malesuada fames ac ante ipsum primis in faucibus. Proin tempus
          felis sit amet diam faucibus sagittis.
        </span>
        <div>
          <h1>My Stacks</h1>
          <Swiper
            className="pb-10!"
            spaceBetween={0}
            slidesPerView={6}
            navigation={false}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            modules={[Pagination]}
          >
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="HTML"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>HTML</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="CSS"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>CSS</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="Bootstrap"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>Bootstrap</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="Tailwind CSS"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>Tailwind CSS</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="JavaScript"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>JavaScript</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="React.js"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>React.js</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="Next.js"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>Next.js</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="Express.js"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>Express.js</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="Node.js"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>Node.js</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="PHP"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>PHP</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="Python"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>Python</span>
            </SwiperSlide>
            <SwiperSlide className="flex! flex-col items-center gap-2">
              <Image
                src="/images/web.jpg"
                alt="Django"
                width={100}
                height={100}
                className="rounded-full"
              />
              <span>Django</span>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
