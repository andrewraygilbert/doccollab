export const environment = {
  production: true,
  dbURI: process.env.MONGODB_URI,
  REDIS_URI: 'redis://h:peb1153eccdd4ad8a446810f87586a0404d17b052c61a0a716864ae65007871be@ec2-52-203-67-230.compute-1.amazonaws.com:21009',
  JWT_SECRET: process.env.JWT_SECRET,
  API_BASE_URL: 'https://doccollab.herokuapp.com/api/',
};
