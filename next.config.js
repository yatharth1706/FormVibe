/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_ID: process.env.DATABASE_ID,
    FORM_COLLECTION_ID: process.env.FORM_COLLECTION_ID,
    RESPONSE_COLLECTION_ID: process.env.RESPONSE_COLLECTION_ID,
    BUCKET_ID: process.env.BUCKET_ID,
  },
};

module.exports = nextConfig;
