/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  basePath: isGithubPages ? "/cumple_leris" : "",

  assetPrefix: isGithubPages ? "/cumple_leris/" : "",
};

module.exports = nextConfig;