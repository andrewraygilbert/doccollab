export const environment = {
  production: true,
  dbURI: process.env.MONGODB_URI,
  REDIS_URI: process.env.REDIS_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  API_BASE_URL: 'https://doccollab.herokuapp.com/api/',
};
