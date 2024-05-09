'use strict';

require('dotenv').config();
const Sequelize = require('sequelize');
const db = {};

const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: process.env.DB_BASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+09:00', // 한국 시간 "asia/seoul"
    dialectOptions: {
        charset: 'utf8mb4',
        dateStrings: true,
        typeCast: true,
    },
    define: {
        underscored: false,
        freezeTableName: false,
        charset: 'utf8',
        timestamps: true,
        paranoid: true,
    },
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user/user')(sequelize, Sequelize) // 유저 테이블
db.Command  = require('./command/command')(sequelize, Sequelize);
// db.Image = require('./image/image')(sequelize,Sequelize);



db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db;