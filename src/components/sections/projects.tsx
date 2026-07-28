"use client";

import { useState, useRef, useEffect, useCallback, startTransition } from "react";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import { ProjectModal } from "@/components/projects/project-modal";
import { projects, sectionHeadings } from "@/lib/data";
import type { Project } from "@/types";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef(0);
  const heading = sectionHeadings.projects;

  // Keep ref in sync with state so IntersectionObserver can read it
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  // Stop auto-scroll when the section leaves the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && isScrollingRef.current) {
          setIsScrolling(false);
        }
      },
      { threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Measure reset point at the first extra card's left edge.
  // Re-measure on resize so the value stays in sync with the layout.
  const measure = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-project-card]");
    if (cards[projects.length]) {
      const offset = (cards[projects.length] as HTMLElement).offsetLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;
      singleSetWidthRef.current = Math.min(offset, maxScroll);
    }
  }, []);

  // Re-measure when the scroll container resizes (viewport changes, font changes, etc.)
  // Also ensures the reset point is current even if the user resizes while scrolling.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Toggle auto-scroll on/off.
  // Measures the reset point at click time (when scrolling starts) so it always
  // reflects the current layout — not a stale mount-time value.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (!isScrolling) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // Measure now — the user just clicked, so the layout is current
    measure();
    if (singleSetWidthRef.current === 0) return;

    const speed = 1.5;

    const scroll = () => {
      if (!el) return;

      el.scrollLeft += speed;

      // Reset when the first extra card reaches the left edge,
      // or when we've scrolled to the very end (backup for narrow viewports)
      // Read ref.current live so ResizeObserver updates take effect mid-scroll
      const resetAt = singleSetWidthRef.current;
      if (el.scrollLeft >= resetAt || el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isScrolling]);

  return (
    <section ref={sectionRef} id="projects" className="brutal-border-b bg-brutal-gray">
      <div className="flex flex-col items-stretch brutal-border-b border-brutal-black md:flex-row">
        {/* Section label block */}
        <div className="flex flex-row md:flex-col justify-between border-brutal-black bg-brutal-yellow p-6 max-md:brutal-border-b md:w-1/4 md:p-10 md:brutal-border-r">
          <div>
            <span className="mb-4 block font-mono text-xl font-bold text-brutal-black">
              {heading.index} {"//"} {heading.label}
            </span>
            <h2 className="break-words font-display text-4xl font-black uppercase leading-none tracking-tighter text-brutal-black">
              {heading.titleTop}
              <br />
              {heading.titleBottom}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsScrolling((prev) => !prev)}
            className="mt-20 cursor-pointer"
            aria-label={isScrolling ? "Stop auto-scroll" : "Start auto-scroll"}
          >
            <ArrowRight
              size={36}
              aria-hidden="true"
              className={`block transition-all duration-300 text-brutal-black ${
                isScrolling ? "animate-scroll-flow" : "animate-attract-idle"
              }`}
            />
          </button>
        </div>

        {/* Horizontal scroll rail */}
        <div
          ref={scrollRef}
          className="relative flex w-full overflow-x-auto no-scrollbar bg-black md:w-3/4"
        >
          {[...projects, ...projects.slice(0, 2)].map((project, i) => (
            <ProjectCard
              key={`${project.id}-${i}`}
              project={project}
              index={i}
              priority={i < 3}
              onSelect={() => {
                setIsScrolling(false);
                startTransition(() => setSelectedProject(project));
              }}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => startTransition(() => setSelectedProject(null))}
      />
    </section>
  );
}
