import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t-8 border-brutal-yellow bg-brutal-black text-brutal-white">
      <div className="flex flex-col items-center justify-between gap-6 p-12 md:flex-row mx-auto max-w-7xl">
        <div className="font-display text-4xl font-black uppercase tracking-tighter">
          {siteConfig.name}
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {siteConfig.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-mono font-bold uppercase border-4 transition-colors"
              style={{
                backgroundColor: social.brandColor,
                borderColor: social.brandColor,
                color: '#ffffff',
              }}
            >
              {social.label}
            </a>
          ))}
        </nav>

        <div className="bg-brutal-gray p-2 font-mono text-sm uppercase border-4 border-brutal-white">
          SYS.TIME: {new Date().getFullYear()}{' // '}ALL RIGHTS SECURED.
        </div>
      </div>
    </footer>
  );
}
