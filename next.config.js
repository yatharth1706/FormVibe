/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_ID: process.env.DATABASE_ID,
    FORM_COLLECTION_ID: process.env.FORM_COLLECTION_ID,
  },
};

module.exports = nextConfig;
