'use strict'

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user/user')(sequelize, Sequelize) // 유저 테이블

db.sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;



module.exports = db;