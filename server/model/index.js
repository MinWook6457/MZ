'use strict'

require('dotenv').config()
const Sequelize = require('sequelize')
const db = {}

const env = process.env.NODE_ENV || 'development';
const mysql_config = require('../config/mysql_config')[env];

const config = {
    username: mysql_config.username,
    password: mysql_config.password,
    database: mysql_config.database,
    host: mysql_config.host,
    dialect: mysql_config.dialect,
    timezone: '+09:00', // 한국 시간 "asia/seoul"
    dialectOptions: {
      charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true
    },
    define: {
      underscored: false,
      freezeTableName: false,
      charset: 'utf8',
      timestamps: true,
      paranoid: true,
    },
  }

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.User = require('./user/user')(sequelize, Sequelize) // 유저 테이블
db.Command  = require('./command/command')(sequelize, Sequelize);
// db.Image = require('./image/image')(sequelize,Sequelize);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;