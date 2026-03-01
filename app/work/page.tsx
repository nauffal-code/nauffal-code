"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "@/components/ProjectCard";

export default function WorkPage() {
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
        const res = await fetch("/api/projects");
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

  // FILTERED PRODUCTS
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
    <div className="wrapper">
      <div className="content">
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
    </div>
  );
}
