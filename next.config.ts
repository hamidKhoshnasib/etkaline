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
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/appliances",
        destination: "/",
        permanent: true,
      },
      {
        source: "/appliances/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/fresh/products/:path*",
        permanent: true,
      },
      {
        source: "/search/category/:path*",
        destination: "/fresh/search/category/:path*",
        permanent: true,
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
