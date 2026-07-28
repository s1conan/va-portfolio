import { benchmarks, sectionHeadings, testimonials } from "@/lib/data";

export function Benchmarks() {
  const heading = sectionHeadings.benchmarks;

  return (
    <section id="benchmarks" className="brutal-border-b bg-brutal-white">
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
        <div className="col-span-1 md:col-span-9">
          <div className="grid grid-cols-2">
            {benchmarks.map((item) => (
              <div
                key={item.metric}
                className="flex flex-col justify-center p-6 md:p-10 border-brutal-black odd:brutal-border-r max-md:even:border-l max-md:even:border-brutal-black"
              >
                <span className="font-display text-5xl font-black uppercase md:text-6xl">
                  {item.value}
                </span>
                <span className="mt-1 font-mono text-sm font-bold uppercase opacity-70">
                  {item.metric}
                </span>
                <span className="mt-1 font-mono text-xs font-bold uppercase text-brutal-yellow bg-brutal-black p-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          {testimonials.length > 0 && (
            <div className="brutal-border-t border-brutal-black grid grid-cols-1 md:grid-cols-2">
              {testimonials.map((quote, i) => (
                <div
                  key={i}
                  className="bg-brutal-black p-4 max-md:brutal-border-b md:even:brutal-border-l border-brutal-black"
                >
                  <p className="font-mono text-sm font-bold leading-relaxed text-brutal-yellow md:text-base">
                    {quote}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
