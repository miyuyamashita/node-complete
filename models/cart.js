const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Cart = sequelize.define('cart',{
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
},{
  timestamps:false
});

module.exports = Cart;