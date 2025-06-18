/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode is true by default with the App Router,
  // but it's good practice to keep it explicitly defined.
  reactStrictMode: true,
  // The appDir feature is stable in Next.js 14 and no longer needs
  // to be enabled under the 'experimental' flag.
  // The 'experimental' key has been removed.
  images: {
    // Defines the list of allowed external hostnames for next/image.
    // This is a security measure to prevent arbitrary image hosting.
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig; 
