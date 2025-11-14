import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'br.pinterest.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'emerald-peculiar-whale-200.mypinata.cloud',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mypinata.cloud',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
