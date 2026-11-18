/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages (writes to ./out)
  output: 'export',
  images: {
    // The Next.js image optimizer needs a server; serve images as-is instead
    unoptimized: true,
  },
}

module.exports = nextConfig
