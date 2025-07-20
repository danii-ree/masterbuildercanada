import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.imgur.com', // Replace with your image's domain
            port: '',
            pathname: '/**', // Allows any path on the domain
          },
          // Add more objects for other remote domains if needed
        ],
      },
};

export default nextConfig;
