import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SIMPLE_ARRAY: process.env.SIMPLE_ARRAY,
  COUNTRIES_URL: process.env.COUNTRIES_URL as string
};

export default config;
