import { sectionHeadings, services } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Services() {
  const heading = sectionHeadings.services;

  return (
    <section id="services" className="brutal-border-b bg-brutal-white">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1 md:col-span-3 flex flex-col justify-start bg-brutal-yellow p-6 text-brutal-black md:p-10 max-md:brutal-border-b md:brutal-border-r border-brutal-black">
          <span className="mb-4 block font-mono text-lg font-bold">
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
        <div className="col-span-1 grid grid-cols-1 md:col-span-9 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group p-6 transition-colors hover:bg-brutal-yellow",
                index < 2 && "max-md:brutal-border-b",
                index % 2 === 0 && "md:brutal-border-r border-brutal-black",
                index === 2 && "max-md:brutal-border-b",
              )}
            >
              <h3 className="font-display text-2xl font-black uppercase">
                {service.title}
              </h3>
              <span className="mb-4 block font-mono text-xs font-bold uppercase text-brutal-yellow bg-brutal-black p-1">
                {service.description}
              </span>
              <ul className="space-y-1">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm font-bold uppercase opacity-80 transition-opacity group-hover:opacity-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
