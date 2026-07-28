import { marqueeItems } from "@/lib/data";

interface MarqueeSetProps {
  ariaHidden?: boolean;
}

/** One full slogan sequence; rendered twice so the -50% translate loop is seamless. */
function MarqueeSet({ ariaHidden = false }: MarqueeSetProps) {
  return (
    <div
      className="flex items-center shrink-0"
      aria-hidden={ariaHidden || undefined}
    >
      {marqueeItems.flatMap((item, index) => [
        <span key={`${index}-item`} className="mr-4">
          {item}
        </span>,
        <span key={`${index}-separator`} className="ml-4" aria-hidden="true">
          {"//"}
        </span>,
      ])}
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Highlights"
      className="group brutal-border-b bg-brutal-yellow py-2 overflow-hidden"
    >
      <div className="flex w-max animate-marquee items-center whitespace-nowrap font-mono text-lg font-bold uppercase group-hover:[animation-play-state:paused]">
        <MarqueeSet />
        <MarqueeSet ariaHidden />
      </div>
    </section>
  );
}
