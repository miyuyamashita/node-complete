const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Order = sequelize.define('order',{
  id:{
    type:Sequelize.DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true}
});

module.exports = Order;