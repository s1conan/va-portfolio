import { memo } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
  index?: number;
  priority?: boolean;
}

/**
 * Presentational scroll-snap card for the projects rail.
 * Memoized to prevent re-rendering when parent state changes.
 */
export const ProjectCard = memo(function ProjectCard({
  project,
  onSelect,
  index = 0,
  priority = false,
}: ProjectCardProps) {
  return (
    <article
      data-project-card
      style={{ scrollSnapAlign: "start" }}
      className="group max-h-[90vh] relative w-[90%] flex-none border-r-4 border-brutal-black md:w-[60%]"
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`View project ${project.title}`}
        className="block h-full w-full cursor-pointer text-left"
      >
        {/* Image pane */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-brutal-white p-4 brutal-border-b border-brutal-black">
          <span className="absolute left-0 top-0 z-10 bg-brutal-yellow px-2 py-1 font-mono text-xs font-bold uppercase text-brutal-black brutal-border-r brutal-border-b border-brutal-black">
            ID: {project.id}
          </span>
          <div className="relative h-full w-full overflow-hidden border-2 border-brutal-black">
            <Image
              src={project.images[0]}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              className="object-cover grayscale contrast-125 transition-[filter] duration-300 group-hover:grayscale-0"
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col justify-between bg-brutal-white p-6 min-h-[256px]">
          <div>
            <h3 className="mb-2 font-display text-2xl font-black uppercase leading-none text-brutal-black">
              {project.title}
            </h3>
            <p className="mb-6 inline-block w-fit bg-brutal-yellow px-1 font-mono text-sm font-bold uppercase text-brutal-black">
              {project.tagline}
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="w-fit bg-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase text-brutal-white"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ArrowRight
              size={40}
              aria-hidden="true"
              className="text-brutal-black transition-colors group-hover:text-brutal-yellow"
            />
          </div>
        </div>
      </button>
    </article>
  );
});
