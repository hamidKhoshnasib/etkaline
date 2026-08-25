import type { NextConfig } from "next";

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

if (!imageBaseUrl) {
  throw new Error("NEXT_PUBLIC_IMAGE_BASE_URL must be defined.");
}

const imageUrl = new URL(imageBaseUrl);

if (imageUrl.protocol !== "http:" && imageUrl.protocol !== "https:") {
  throw new Error("NEXT_PUBLIC_IMAGE_BASE_URL must use HTTP or HTTPS.");
}

const imageProtocol: "http" | "https" = imageUrl.protocol === "http:" ? "http" : "https";
const developmentScriptSource = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              `script-src 'self' 'unsafe-inline' https://map.etkala.ir${developmentScriptSource}`,
              "style-src 'self' 'unsafe-inline' https://map.etkala.ir",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://map.etkala.ir",
              "connect-src 'self' https://map.etkala.ir https://nominatim.openstreetmap.org",
              "frame-src https://www.google.com",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: imageProtocol,
        hostname: imageUrl.hostname,
        port: imageUrl.port,
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
