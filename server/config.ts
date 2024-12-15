export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key', // Use env variable in production
  dbPath: 'wordle.db',
};