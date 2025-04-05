/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Désactiver le strict mode pour éviter les doubles rendus en développement
  reactStrictMode: false,
};

export default nextConfig;

