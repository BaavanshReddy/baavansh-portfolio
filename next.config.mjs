/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't fail production builds on lint warnings. Type checking still runs.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
