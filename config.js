const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "default_secret-key",
  mongoUri: port.env.MONGODB_URI || "mongodb://localhost:27017/social_media",
};
