/** @type {import('next').NextConfig} */
const nextConfig = {
  /*  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  }, */
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "204.152.197.183",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gazihomeappliances.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "halcyonecom.xyz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
