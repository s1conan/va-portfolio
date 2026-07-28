import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder SVGs only; sandboxed per Next.js security guidance.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
