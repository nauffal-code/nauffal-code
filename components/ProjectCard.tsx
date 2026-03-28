import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
  projectLink,
}: ProjectCardProps) => {
  const [hover, setHover] = useState(false);
  const [imgError, setImgError] = useState(false);

  const toggleHover = () => setHover(!hover);

  const showImage = projectImg && !imgError;

  return (
    <Link
      href={projectLink}
      className="flex flex-col bg-white rounded-[20px] shadow-lg hover:scale-105 transition duration-300 ease-in-out"
      onMouseLeave={() => {
        if (hover) toggleHover();
      }}
    >
      <div className="w-full aspect-square relative bg-gray-100 rounded-t-[20px] overflow-hidden">
        {showImage ? (
          <Image
            className="w-full h-full object-cover"
            width={400}
            height={400}
            src={projectImg}
            alt={projectName}
            onError={() => setImgError(true)}
            unoptimized={
              projectImg.includes(".JPG") || projectImg.includes(".jpg")
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">📷</span>
          </div>
        )}
      </div>

      <div className="relative md:p-5 sm:p-4 p-3">
        <div className="flex justify-between items-center">
          <span className="md:text-xl sm:text-lg text-base font-semibold">
            {projectName}
          </span>
          <p className="md:text-2xl sm:text-xl text-lg">
            <FontAwesomeIcon icon={faGithub} />
          </p>
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
