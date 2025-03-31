const Sequelize = require('sequelize');

const sequelize =require('../utils/database');

const OrderItem = sequelize.define('orderItem',{
  id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
  quantity:{
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  }
},{
  timestamps: false
});

module.exports = OrderItem;