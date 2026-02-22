import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { useState } from "react";

type ProjectCardProps = {
  projectImg: string;
  projectName: string;
  projectTools: string[];
  projectDesc: string;
  projectGithub: string;
  projectLink: string;
};

const ProjectCard = ({
  projectImg,
  projectName,
  projectTools,
  projectDesc,
  projectGithub,
  projectLink,
}: ProjectCardProps) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <Link
      href={projectLink}
      target="_blank"
      className="flex flex-col bg-white rounded-[20px] hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
      onMouseLeave={() => {
        if (hover) toggleHover();
      }}
    >
      <Image
        className="w-full aspect-square object-cover rounded-t-[20px]"
        width={100}
        height={100}
        src={projectImg}
        alt={projectName}
      />
      <div className="relative md:p-5 sm:p-4 p-3">
        <div className="flex justify-between items-center">
          <span className="md:text-xl sm:text-lg text-base font-semibold">
            {projectName}
          </span>
          <Link
            className="md:text-2xl sm:text-xl text-lg"
            href={projectGithub}
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        </div>
        <div className="flex md:gap-2 gap-1 sm:my-2 my-1 sm:pb-2 pb-1 custom-scroll">
          {projectTools.map((tool: string, index: number) => (
            <span
              key={index}
              className="bg-accent sm:text-sm text-xs text-white py-1 px-2 rounded-[5px]"
            >
              {tool}
            </span>
          ))}
        </div>
        <p
          className={`md:text-base sm:text-sm text-xs text-justify overflow-hidden transition-all duration-500 ease-in-out ${
            hover ? "max-h-[1000px]" : "max-h-[96px]"
          }`}
        >
          {projectDesc}
        </p>
        <p
          className={
            hover
              ? `hidden absolute md:bottom-5 md:right-5 sm:bottom-4 sm:right-4 bottom-3
right-3 bg-white pl-1 sm:text-sm text-xs text-accent font-semibold cursor-pointer`
              : `absolute md:bottom-5 md:right-5 sm:bottom-4 sm:right-4 bottom-3
right-3 bg-white pl-1 sm:text-sm text-xs text-accent font-semibold cursor-pointer`
          }
        >
          <span className="text-secondary">...</span> Read more
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
