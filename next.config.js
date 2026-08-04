/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Compatible con GitHub Pages si se despliega en subruta o raíz
  trailingSlash: true,
};

module.exports = nextConfig;
