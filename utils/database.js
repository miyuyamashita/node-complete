const Sequelize = require('sequelize');

const sequelize = new Sequelize('review-section11',
  'root','zq19pm',{
  dialect: 'mysql',
  host:'localhost'
});

module.exports = sequelize;