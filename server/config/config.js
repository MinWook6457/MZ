require('dotenv').config();
const env = process.env;

// 개발 서버
const development = {
  username: env.DB_USER,
  password: env.DB_PASW,
  database: env.DB_BASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT
};

// 개인 서버
const local = {
  username: env.DB_USER,
  password: env.DB_PASW,
  database: env.DB_BASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT
}

// 운영 서버
const production = {
  username: env.DB_USER,
  password: env.DB_PASW,
  database: env.DB_BASE,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT
}

module.exports = { development, production, local }