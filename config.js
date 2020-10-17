const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "default_secret-key",
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost/social_media",
};

export default config;
