import { siteConfig, terminalLines } from "@/lib/data";
import Image from "next/image";

const crosshatchBackground =
  'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWExYTFhIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+")';

export function Hero() {
  return (
    <section id="hero" className="relative brutal-border-b overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[42vh]">
        {/* Text column */}
        <div className="col-span-1 md:col-span-8 relative z-10 flex flex-col justify-center bg-brutal-white p-4 pt-16 md:p-12 max-md:brutal-border-b md:brutal-border-r">
          <div className="absolute left-4 top-4 md:left-6 md:top-6 bg-brutal-black px-2 py-1 font-mono text-xs font-bold uppercase text-brutal-yellow">
            {siteConfig.statusBadge}
          </div>
          <h1 className="font-display text-5xl font-black uppercase leading-[0.85] tracking-tight md:text-7xl mb-6 break-words">
            {siteConfig.heroHeadlineTop}
            <br />
            <span className="text-brutal-yellow text-stroke-brutal">
              {siteConfig.heroHeadlineHighlight}
            </span>
            <br />
            {siteConfig.heroHeadlineBottom}
          </h1>
          <p className="mb-8 inline-block max-w-2xl bg-brutal-black p-4 font-mono text-lg font-bold uppercase leading-tight text-brutal-white md:text-xl">
            {siteConfig.heroTagline}
          </p>
          <div className="mt-auto flex flex-wrap gap-6">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-brutal-yellow px-8 py-4 font-display text-lg font-bold uppercase text-brutal-black brutal-border shadow-brutal transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-hover"
            >
              EXECUTE CONSULTATION
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center bg-brutal-white px-8 py-4 font-display text-lg font-bold uppercase text-brutal-black brutal-border shadow-brutal transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-hover"
            >
              ACCESS LOGS
            </a>
          </div>
        </div>

        {/* Terminal column */}
        <div className="col-span-1 md:col-span-4 flex flex-col bg-brutal-black p-6 md:flex hidden">
          <div className="relative flex-1 overflow-hidden border-4 group min-h-[240px]">
            <div
              className="absolute inset-0"
              style={{ backgroundImage: crosshatchBackground }}
            >
              <Image
                src="/images/projects/beta-02.svg"
                alt="Hero"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="eager"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[12rem] font-black text-brutal-yellow opacity-20 transition-transform duration-500 group-hover:scale-110 select-none"
            ></div>
          </div>
          <div className="mt-6 border-4 border-brutal-gray p-4">
            <div className="font-mono text-xs font-bold uppercase leading-relaxed text-brutal-yellow">
              {terminalLines.map((line) => (
                <span key={line} className="block">
                  &gt; {line}
                </span>
              ))}
              <div className="flex flex-row gap-2">
                <span>&gt;</span>
                <span className="block animate-cursor">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
