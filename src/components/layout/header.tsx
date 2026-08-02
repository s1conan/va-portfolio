"use client";

import { useState } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 500);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-900 brutal-border-b">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-stretch w-full mx-auto max-w-7xl">
        {/* flex on Link lets the logo cell stretch to full header height */}
        <a href="#hero" className="flex">
          <div className="bg-brutal-yellow font-display text-2xl font-bold uppercase tracking-tighter p-4 max-md:brutal-border-b md:brutal-border-r md:text-3xl flex items-center">
            Web_Dev
          </div>
        </a>

        {/* w-full keeps the border-segmented cells continuous across the header */}
        <nav className="hidden md:flex md:justify-between w-full items-stretch bg-brutal-black text-brutal-white">
          {siteConfig.navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(index)}
              className={cn(
                "relative flex items-center justify-center font-mono text-sm font-bold uppercase px-4 py-4 transition-colors zoom-burst hover:text-brutal-yellow min-w-[120px]",
                index < siteConfig.navLinks.length - 1 && "",
                clickedIndex === index && "zoom-burst-active",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-stretch">
          <a
            href="#contact"
            className="flex items-center justify-center bg-green-800 px-3 py-6 font-display text-lg font-bold uppercase text-brutal-white brutal-border-l transition-colors hover:bg-brutal-yellow hover:text-brutal-black lg:whitespace-nowrap"
          >
            INITIALIZE SECURE LINK
          </a>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
