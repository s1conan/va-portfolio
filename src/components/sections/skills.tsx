import { Server, Settings, Terminal, type LucideIcon } from "lucide-react";

import { sectionHeadings, skillCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { SkillIcon } from "@/types";

const skillIcons: Record<SkillIcon, LucideIcon> = {
  terminal: Terminal,
  server: Server,
  settings: Settings,
};

/** Column-index variants: the middle panel inverts black/white instead of filling yellow. */
const panelVariants = [
  "max-md:brutal-border-b md:brutal-border-r border-brutal-black bg-brutal-white text-brutal-black hover:bg-brutal-yellow",
  "max-md:brutal-border-b md:brutal-border-r border-brutal-black bg-brutal-black text-brutal-white hover:bg-brutal-yellow hover:text-brutal-black",
  "bg-brutal-white text-brutal-black hover:bg-brutal-yellow",
];

const iconRotations = [
  "group-hover:rotate-90",
  "group-hover:-rotate-90",
  "group-hover:rotate-180",
];

export function Skills() {
  const heading = sectionHeadings.skills;

  return (
    <section id="skills" className="brutal-border-b bg-brutal-white">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-1 md:col-span-3 flex flex-col justify-start bg-brutal-black p-6 text-brutal-white md:p-10 max-md:brutal-border-b md:brutal-border-r border-brutal-black">
          <span className="mb-4 block font-mono text-xl font-bold text-brutal-yellow">
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
        <div className="col-span-1 grid grid-cols-1 md:col-span-9 md:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = skillIcons[category.icon];
            return (
              <div
                key={category.title}
                className={cn(
                  "group p-6 md:p-10 transition-colors",
                  panelVariants[index],
                )}
              >
                <h3 className="mb-8 flex items-center justify-between font-display text-2xl font-black uppercase tracking-tighter">
                  {category.title}
                  <Icon
                    size={32}
                    className={cn("transition-transform", iconRotations[index])}
                    aria-hidden
                  />
                </h3>
                <ul className="space-y-3 font-mono text-base font-bold uppercase">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between pb-2 not-last:border-b-4 not-last:border-current"
                    >
                      {skill.name}
                      <span className="opacity-50">{skill.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
