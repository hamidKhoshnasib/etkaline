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

const nextConfig: NextConfig = {
  // Keep production rendering optimized without paying Babel's compile cost in local development.
  reactCompiler: process.env.NODE_ENV === "production",
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
