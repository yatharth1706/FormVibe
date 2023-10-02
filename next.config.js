/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    DATABASE_ID: process.env.DATABASE_ID,
    FORM_COLLECTION_ID: process.env.FORM_COLLECTION_ID,
    RESPONSE_COLLECTION_ID: process.env.RESPONSE_COLLECTION_ID,
    BUCKET_ID: process.env.BUCKET_ID,
    USER_COLLECTION_ID: process.env.USER_COLLECTION_ID,
  },
};

module.exports = nextConfig;
