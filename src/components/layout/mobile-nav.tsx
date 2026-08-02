"use client";

import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 400);
    setOpen(false);
  };

  // Close the panel on Escape; listener only lives while the panel is open.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="md:hidden flex items-stretch">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((previous) => !previous)}
        className="bg-brutal-white p-6 brutal-border-l transition-colors hover:bg-brutal-yellow"
      >
        {open ? (
          <X size={32} aria-hidden="true" />
        ) : (
          <Menu size={32} aria-hidden="true" />
        )}
      </button>

      {open && (
        <nav
          id="mobile-nav-panel"
          className="absolute left-0 right-0 top-full z-40 bg-brutal-white brutal-border-b"
        >
          {siteConfig.navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(index)}
              className={cn(
                "block font-mono text-lg font-bold uppercase p-6 brutal-border-t transition-colors hover:bg-brutal-black hover:text-white zoom-burst",
                clickedIndex === index && "zoom-burst-active",
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block bg-brutal-black p-6 text-center font-display text-lg font-bold uppercase text-brutal-yellow brutal-border-t transition-colors hover:bg-brutal-yellow hover:text-brutal-black"
          >
            INITIALIZE SECURE LINK
          </a>
        </nav>
      )}
    </div>
  );
}
