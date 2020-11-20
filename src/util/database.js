const Sequelize = require('sequelize');

const sequelize = new Sequelize('blogpost', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;