"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { certifications, sectionHeadings } from "@/lib/data";

export function Certifications() {
  const heading = sectionHeadings.certifications;
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef(0);

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
    const cards = el.querySelectorAll("[data-cert-card]");
    if (cards[certifications.length]) {
      const offset = (cards[certifications.length] as HTMLElement).offsetLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;
      singleSetWidthRef.current = Math.min(offset, maxScroll);
    }
  }, []);

  // Re-measure when the scroll container resizes (viewport changes, font changes, etc.)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // Toggle auto-scroll on/off.
  // Measures the reset point at click time so it always reflects the current layout.
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

      // Reset when first extra card reaches left edge OR when scrolled to the end
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
    <section
      ref={sectionRef}
      id="certifications"
      className="brutal-border-b bg-brutal-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1 md:col-span-3 flex flex-row md:flex-col justify-between bg-brutal-black p-6 text-brutal-white md:p-10 max-md:brutal-border-b md:brutal-border-r border-brutal-black">
          <div>
            <span className="mb-4 block font-mono text-lg font-bold text-brutal-yellow">
              {heading.index}
              {" // "}
              {heading.label}
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tighter break-words">
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
              className={`block transition-all duration-300 text-brutal-white ${
                isScrolling ? "animate-scroll-flow" : "animate-attract-idle"
              }`}
            />
          </button>
        </div>
        <div
          ref={scrollRef}
          className="col-span-1 flex w-full overflow-x-auto no-scrollbar md:col-span-9"
        >
          {[...certifications, ...certifications.slice(0, 2)].map(
            (cert, index) => (
              <a
                key={`${cert.title}-${index}`}
                data-cert-card
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-[80%] flex-none border-r-4 border-brutal-black p-6 md:p-8 md:w-[50%] transition-colors hover:bg-brutal-yellow block"
                onClick={() => setIsScrolling(false)}
              >
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden brutal-border bg-brutal-black">
                  <Image
                    src={cert.image}
                    alt={cert.imageAlt}
                    fill
                    sizes="(max-width: 768px) 80vw, 50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                    className="object-cover grayscale transition-transform duration-500 group-hover:scale-110 group-hover:grayscale-0"
                  />
                </div>
                <h3 className="mb-2 font-display text-xl font-black uppercase">
                  {cert.title}
                </h3>
                <p className="font-mono text-sm font-bold uppercase opacity-70">
                  Issued by: {cert.issuer}
                </p>
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
