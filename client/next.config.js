/** @type {import('next').NextConfig} */
const { parsed: env } = require('dotenv').config({ path: '../.env' });
const nextConfig = {
    env,
    output: 'export'
}

module.exports = nextConfig