/** @type {import('next').NextConfig} */
import createJiti from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti("./src/env/values.ts");

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
