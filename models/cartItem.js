const Sequelize = require('sequelize');

const sequelize =require('../utils/database');

const CartItem = sequelize.define('cartItem',{
  id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  quantity: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  }
},{
  timestamps: false
});

module.exports = CartItem;