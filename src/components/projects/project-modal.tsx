"use client";

import { useState, useEffect, startTransition } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Full-screen project detail dialog built on the Base UI dialog primitive.
 * The default centered-popup styles of DialogContent are neutralized via
 * className (twMerge resolves the conflicts in favor of these overrides).
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasMultipleImages = project && project.images.length > 1;

  // Preload adjacent images to reduce decode time on navigation
  useEffect(() => {
    if (!project || !hasMultipleImages) return;

    const preloadImage = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };

    const prevIndex = currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;
    const nextIndex = currentImageIndex === project.images.length - 1 ? 0 : currentImageIndex + 1;

    preloadImage(project.images[prevIndex]);
    preloadImage(project.images[nextIndex]);
  }, [currentImageIndex, project, hasMultipleImages]);

  const goToPreviousImage = () => {
    if (!project) return;
    startTransition(() => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    });
  };

  const goToNextImage = () => {
    if (!project) return;
    startTransition(() => {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    });
  };

  return (
    <Dialog
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) {
          setScrolled(false);
          setCurrentImageIndex(0);
          onClose();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="fixed left-1/2 top-1/2 w-full max-w-7xl max-h-[85vh] -translate-x-1/2 -translate-y-1/2 grid-cols-1 max-md:grid-rows-2 gap-0 overflow-hidden rounded-none border-4 border-brutal-white bg-brutal-white p-0 ring-0 shadow-brutal-yellow sm:max-w-7xl md:grid-cols-3 md:grid-rows-1 data-open:zoom-in-100 data-closed:zoom-out-100"
      >
        <DialogClose
          aria-label="Close modal"
          className="absolute right-0 top-0 z-10 flex h-16 w-16 items-center justify-center bg-brutal-yellow font-display text-2xl font-black text-brutal-black brutal-border-l brutal-border-b border-brutal-black transition-colors hover:bg-brutal-black hover:text-brutal-yellow"
        >
          X
        </DialogClose>

        {project ? (
          <>
            {/* LEFT: image */}
            <div className="relative border-brutal-black bg-brutal-gray p-1 max-md:brutal-border-b md:col-span-2 md:brutal-border-r">
              <div className="relative h-64 w-full border-4 border-brutal-black bg-black md:h-full">
                {/* Pre-render all images, use opacity to switch */}
                {project.images.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    loading="lazy"
                    decoding="async"
                    className={`p-2 object-contain transition-opacity duration-200 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  />
                ))}

                {/* Navigation buttons */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={goToPreviousImage}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-brutal-yellow border-4 border-brutal-black text-brutal-black transition-colors hover:bg-brutal-black hover:text-brutal-yellow"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={goToNextImage}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-brutal-yellow border-4 border-brutal-black text-brutal-black transition-colors hover:bg-brutal-black hover:text-brutal-yellow"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Page indicators */}
                    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                          className={`h-3 w-3 border-2 border-brutal-black transition-colors ${
                            index === currentImageIndex
                              ? "bg-brutal-yellow"
                              : "bg-brutal-white"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT: info */}
            <div
              onScroll={(e) => {
                const target = e.currentTarget;
                setScrolled(target.scrollTop > 10);
              }}
              className="relative flex h-full min-h-0 flex-col overflow-y-auto no-scrollbar bg-brutal-white"
            >
              {/* Scroll-down indicator — fades out when scrolled */}
              <div
                className={`pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex items-end justify-center bg-gradient-to-t from-brutal-white via-brutal-white/80 to-transparent pb-4 pt-16 transition-opacity duration-500 md:pb-6 ${
                  scrolled ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex flex-col items-center gap-1 font-mono text-xs font-bold uppercase text-brutal-black/40">
                  <span>Scroll</span>
                  <svg
                    className="animate-bounce"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 3v10M4 9l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex grow flex-col gap-8 p-4">
                <DialogTitle className="break-words font-display text-2xl font-black uppercase leading-none md:text-3xl pr-10">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {project.tagline}
                </DialogDescription>

                <div>
                  <span className="mb-2 block w-fit bg-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase text-brutal-white">
                    ROLE
                  </span>
                  <p className="border-l-4 border-brutal-yellow pl-4 font-mono text-base font-bold uppercase">
                    {project.role}
                  </p>
                </div>

                <div>
                  <span className="mb-2 block w-fit bg-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase text-brutal-white">
                    STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border-2 border-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="mb-2 block w-fit bg-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase text-brutal-white">
                    OBJECTIVE
                  </span>
                  <p className="bg-brutal-gray p-4 font-mono text-base font-bold uppercase leading-tight text-brutal-white brutal-border border-brutal-black">
                    {project.objective}
                  </p>
                </div>

                <div>
                  <span className="mb-2 block w-fit bg-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase text-brutal-white">
                    OUTPUT
                  </span>
                  <ul className="space-y-2 font-mono text-sm font-bold uppercase">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2">
                        <span
                          className="text-xl text-brutal-yellow"
                          aria-hidden="true"
                        >
                          &gt;
                        </span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Base UI requires a Title for a11y even while the dialog is closed.
          <DialogTitle className="sr-only">Project details</DialogTitle>
        )}
      </DialogContent>
    </Dialog>
  );
}
