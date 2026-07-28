import Image from "next/image";
import { siteConfig, aboutInfo, sectionHeadings } from "@/lib/data";

export function About() {
  const heading = sectionHeadings.about;

  return (
    <section id="about" className="brutal-border-b bg-brutal-white">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Section label */}
        <div className="col-span-1 md:col-span-3 flex flex-col justify-start bg-brutal-black p-6 text-brutal-white md:p-10 max-md:brutal-border-b md:brutal-border-r border-brutal-black">
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
          <div className="flex flex-col mt-12 space-y-4 font-mono text-sm font-bold uppercase md:mt-20">
            <p className="border-b border-white w-fit pb-2 text-brutal-white">
              {siteConfig.email}
            </p>{" "}
            {siteConfig.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit inline-block px-2 py-1 font-mono font-bold uppercase border-4 transition-colors"
                style={{
                  backgroundColor: s.brandColor,
                  borderColor: s.brandColor,
                  color: "#ffffff",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-1 md:col-span-9 p-6 md:p-12 bg-brutal-white">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Profile picture */}
            <div className="flex-shrink-0">
              <div className="relative h-58 w-48 overflow-hidden border-4 border-brutal-black bg-brutal-gray">
                <Image
                  src={aboutInfo.profileImage}
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="font-display text-3xl font-black uppercase text-brutal-black">
                  {siteConfig.name}
                </h3>
                <p className="mt-1 font-mono text-sm font-bold uppercase text-brutal-black/60">
                  {siteConfig.role}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border-l-4 border-brutal-yellow pl-4">
                  <span className="block font-mono text-xs font-bold uppercase text-brutal-black/60">
                    LOCATION
                  </span>
                  <span className="font-mono text-sm font-bold uppercase text-brutal-black">
                    {aboutInfo.location}
                  </span>
                </div>

                <div className="border-l-4 border-brutal-yellow pl-4">
                  <span className="block font-mono text-xs font-bold uppercase text-brutal-black/60">
                    EXPERIENCE
                  </span>
                  <span className="font-mono text-sm font-bold uppercase text-brutal-black">
                    {aboutInfo.experience}
                  </span>
                </div>

                <div className="border-l-4 border-brutal-yellow pl-4">
                  <span className="block font-mono text-xs font-bold uppercase text-brutal-black/60">
                    FOCUS
                  </span>
                  <span className="font-mono text-sm font-bold uppercase text-brutal-black">
                    {aboutInfo.focus}
                  </span>
                </div>

                <div className="border-l-4 border-brutal-yellow pl-4">
                  <span className="block font-mono text-xs font-bold uppercase text-brutal-black/60">
                    AVAILABILITY
                  </span>
                  <span className="font-mono text-sm font-bold uppercase text-brutal-black">
                    {aboutInfo.availability}
                  </span>
                </div>
              </div>

              <p className="font-mono text-sm font-bold uppercase leading-relaxed text-brutal-black">
                {aboutInfo.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
