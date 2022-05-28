/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '',
    domains: ["https://assets-global.website-files.com"]
  },
  env: {
    rpcUrl: process.env.BLOCKCHAIN_RPC_URL || 'RPC_URL_NOT_DEFINED',
  },
}
module.exports = nextConfig
