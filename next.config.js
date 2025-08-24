// next.config.js
const isProd = process.env.NODE_ENV === 'production'
const repo = 'Next-Js' // <-- your repo name

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',            // enables `next export`
  images: { unoptimized: true },// disable image optimizer for static hosting
  trailingSlash: true,          // safer for GitHub Pages routing
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
}
