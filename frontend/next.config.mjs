// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //       images: {
// //     domains: ['localhost',"res.cloudinary.com"],
// //   },
// //   
// // };

// // export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   turbopack: {
//     root: __dirname, // Force Next.js to treat THIS folder as root
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//     ],
//   },
// };

// export default nextConfig;





import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // ✅ Now works in ESM
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
