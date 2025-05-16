import type { NextConfig } from "next";
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  // Add webpack configuration to handle node: protocol imports
  webpack: (config, { isServer }) => {
    // Add node polyfills only for client-side code
    if (!isServer) {
      // Use the NodePolyfillPlugin to handle node: protocol imports
      config.plugins.push(
        new NodePolyfillPlugin()
      );
    }
    
    return config;
  },
};

export default nextConfig;
