const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodejs-complete', 'root', '', {dialect: 'mysql', host: 'localhost'})

module.exports = sequelize