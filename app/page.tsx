"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
  faTv,
  faUserGear,
  faGlobe,
  faWandMagicSparkles,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTiktok,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";

import ProjectCard from "@/components/ProjectCard";

type Project = {
  id: string | number;
  img: string;
  title: string;
  tool: string[];
  desc: string;
  github: string;
  type: string;
  link: string;
};

export default function Home() {
  /* DROPDOWNS */
  const [toolsDrop, setToolsDrop] = useState(false);
  const [typesDrop, setTypesDrop] = useState(false);

  const toggleToolsDrop = useCallback(() => setToolsDrop((p) => !p), []);
  const toggleTypesDrop = useCallback(() => setTypesDrop((p) => !p), []);

  /* PROJECTS */
  const [toolsValue, setToolsValue] = useState("Tools");
  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // FETCH ALL PROJECTS
  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await fetch("/api/project_data");
        if (!res.ok) throw new Error("Failed to fetch projects");

        const data: Project[] = await res.json();
        setAllProjects(data);
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllProjects();
  }, []);

  // FILTERED PROJECTS
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      const matchesTool =
        toolsValue === "Tools" || toolsValue === "All"
          ? true
          : p.tool.some(
              (tool) => tool.toLowerCase() === toolsValue.toLowerCase(),
            );

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.includes(p.type.toLowerCase());

      return matchesSearch && matchesTool && matchesTags;
    });
  }, [searchValue, toolsValue, selectedTags, allProjects]);

  useEffect(() => {
    const delay = setTimeout(() => setProjects(filteredProjects), 200);
    return () => clearTimeout(delay);
  }, [filteredProjects]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedTags((prev) =>
      checked ? [...prev, value] : prev.filter((tag) => tag !== value),
    );
  };

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
    <>
      <main>
        {/* ABOUT ME */}
        <section>
          <article>
            <h1>About Me</h1>
            <div className="flex sm:flex-row flex-col md:gap-6 sm:gap-4 gap-2 w-full">
              <Swiper
                className="w-full sm:w-[500px] h-[350px] text-white m-0!"
                spaceBetween={0}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                loop={true}
                autoplay={{ delay: 3000 }}
                modules={[Autoplay, Pagination]}
              >
                <SwiperSlide className="bg-[url('/images/service.jpg')] bg-cover bg-center rounded-sm">
                  <div className="flex flex-col justify-end sm:gap-y-2 gap-y-1.5 h-full bg-secondary/30 md:px-10 sm:px-8 px-6 md:pb-8 pb-6 rounded-sm">
                    <span className="w-fit bg-accent md:text-xl sm:text-lg text-base py-1 px-2 rounded-xs">
                      Tech Services
                    </span>
                    <p className="text-justify md:text-base sm:text-sm text-xs">
                      My comprehensive range of services includes exceptional
                      website development, innovative web application
                      development, and much more. Let me assist you in
                      overcoming your tech obstacles and achieving your goals.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="bg-[url('/images/information.jfif')] bg-cover bg-center rounded-sm">
                  <div className="flex flex-col justify-end sm:gap-y-2 gap-y-1.5 h-full bg-secondary/30 md:px-10 sm:px-8 px-6 md:pb-8 pb-6 rounded-sm">
                    <span className="w-fit bg-accent md:text-xl sm:text-lg text-base py-1 px-2 rounded-xs">
                      Information about Technology
                    </span>
                    <p className="text-justify md:text-base sm:text-sm text-xs">
                      I consistently share valuable insights on coding and
                      programming for educational purposes across my social
                      media platforms, including Instagram and TikTok. Don’t
                      miss out—check me out today!
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
              <aside className="flex flex-col justify-between sm:w-1/2 w-full">
                <div>
                  <h2>Why This Website Is Made?</h2>
                  <p className="md:text-base sm:text-sm text-xs text-justify">
                    My motivation to create this website is for empowering
                    others through technology. I envisioned a company dedicated
                    to the coding sector, helping individuals develop their
                    websites, create mobile apps, and explore countless
                    possibilities.
                  </p>
                  <Link href="/work" className="main-btn">
                    See My Work<i className="fa-solid fa-angle-right"></i>
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-2 justify-between w-full lg:mt-auto md:mt-8 sm:mt-6 mt-4">
                  <Link
                    href="https://www.instagram.com/2econd.code/"
                    target="_blank"
                    className="flex justify-center items-center text-accent md:text-xl sm:text-lg text-base"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@2econd.code"
                    target="_blank"
                    className="flex justify-center items-center text-accent md:text-xl sm:text-lg text-base"
                  >
                    <FontAwesomeIcon icon={faTiktok} />
                  </Link>
                  <Link
                    href="https://github.com/nauffal-rizky"
                    target="_blank"
                    className="flex justify-center items-center text-accent md:text-xl sm:text-lg text-base"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/naufal-nur-rizky-612449364/"
                    target="_blank"
                    className="flex justify-center items-center text-accent md:text-xl sm:text-lg text-base"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </aside>
            </div>
          </article>
        </section>

        {/* MY WORKS */}
        <section>
          <article>
            <h1>My Works</h1>
            <div className="w-full">
              <div className="flex">
                <form action="#" className="relative w-full h-fit mr-4">
                  <input
                    type="text"
                    placeholder="Search projects...
                "
                    className="w-full md:py-3 py-2 md:px-5 px-4 border-b-2 md:text-base sm:text-sm text-xs border-secondary"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute top-1/2 right-0 bg-[#fff] md:px-5 px-3 text-secondary -translate-y-1/2"
                  />
                </form>
                <div className="relative flex flex-col w-[200px] border-r-2 border-white">
                  <div
                    className="flex justify-between items-center h-full bg-main text-white font-medium md:text-lg sm:text-base text-sm sm:px-4 px-3 rounded-l-[10px]"
                    onClick={toggleToolsDrop}
                  >
                    <span>{toolsValue}</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                  <div
                    className={
                      toolsDrop
                        ? "absolute top-full left-0 flex flex-col w-full h-full opacity-100"
                        : "absolute top-full left-0 flex flex-col w-full h-full opacity-0"
                    }
                    onClick={toggleToolsDrop}
                  >
                    {["All", "HTML", "CSS", "JavaScript", "PHP", "Python"].map(
                      (tool, index) => (
                        <span
                          key={tool}
                          onClick={(e) => {
                            e.stopPropagation();
                            setToolsValue(tool);
                            toggleToolsDrop();
                          }}
                          className={`w-full bg-white text-secondary md:text-base sm:text-sm text-xs text-center py-2 cursor-pointer ${
                            index % 2 === 1 ? "border-y-1 border-secondary" : ""
                          } ${index === 5 ? "rounded-b-[10px]" : ""}`}
                        >
                          {tool}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="relative flex flex-col w-[215px]">
                  <div
                    className="flex justify-between items-center h-full bg-main text-white font-medium md:text-lg sm:text-base text-sm sm:px-4 px-3 rounded-r-[10px]"
                    onClick={toggleTypesDrop}
                  >
                    <span>Types</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                  <div
                    className={
                      typesDrop
                        ? "absolute top-full left-0 flex flex-col w-full h-full opacity-100"
                        : "absolute top-full left-0 flex flex-col w-full h-full opacity-0"
                    }
                  >
                    {["All", "landing page", "web app", "web game"].map(
                      (tag, index) => (
                        <label
                          key={tag}
                          htmlFor="types"
                          className={`flex items-center sm:gap-1 gap-0.5 w-full bg-white text-secondary md:text-base sm:text-sm text-xs py-2 sm:px-3 px-2 ${
                            index % 2 === 1 ? "border-y-1 border-secondary" : ""
                          } ${index === 5 ? "rounded-b-[10px]" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTags((prev) =>
                              prev.includes(tag)
                                ? prev.filter((t) => t !== tag)
                                : [...prev, tag],
                            );
                          }}
                        >
                          <input
                            className="w-4 h-4 accent-accent"
                            type="checkbox"
                            value={tag}
                            name="types"
                            onChange={handleCheckboxChange}
                            checked={selectedTags.includes(tag)}
                          />
                          <i className="fa-solid fa-check checkmark"></i>
                          {tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-3 grid-cols-2 items-start md:gap-x-4 md:gap-y-6 sm:gap-x-2 sm:gap-y-4 gap-x-1 gap-y-2 md:mt-10 sm:mt-8 mt-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    projectImg={project.img}
                    projectName={project.title}
                    projectTools={project.tool}
                    projectDesc={project.desc}
                    projectGithub={project.github}
                    projectLink={project.link}
                  />
                ))}
              </div>
            </div>
            <Link
              href="/work"
              className="w-full md:text-base sm:text-sm text-xs text-center mx-auto sm:py-2 py-1 border-2 border-secondary rounded-[10px] hover:bg-secondary hover:text-white transition-colors duration-300"
            >
              See All Works
            </Link>
          </article>
        </section>

        {/* MY SERVICES */}
        <section>
          <article>
            <h1>My Services</h1>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex flex-col">
                <FontAwesomeIcon
                  className="md:text-2xl sm:text-xl text-lg text-secondary"
                  icon={faTv}
                />
                <span className="font-semibold text-main md:text-2xl sm:text-xl text-lg mt-2 mb-2 pb-2 mx-auto border-b-2 border-accent">
                  Front-end Development
                </span>
                <p className="text-secondary md:text-base sm:text-sm text-xs text-justify">
                  I turn Figma dreams into real, clickable, fast-as-hell
                  websites. Using React, Tailwind, and all the cool front-end
                  magic, I craft sleek, responsive UIs that don’t just look good
                  — they feel good. Your users deserve smooth vibes, and I
                  deliver.
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
                  I handle the behind-the-scenes chaos so your app runs smooth.
                  From APIs that actually make sense to databases that don’t
                  randomly crash, I build back-ends that are clean, scalable,
                  and ready for anything — with Node, Express, and database
                  wizardry in my toolkit.
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
                  I don’t just design pretty pixels — I create experiences that
                  hit. Smooth UI, intuitive UX, no fluff. I go from mockups to
                  live code using Figma + React + Tailwind like it’s second
                  nature. If users vibe with it, I’ve done my job.
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
                  data flowing — fast, reliable, and ready to scale. Mongo? SQL?
                  Got it covered.
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
