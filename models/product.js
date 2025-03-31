const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const { type } = require('os');

const Product = sequelize.define('product',{
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productName:{
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  price:{
    type: Sequelize.DataTypes.DOUBLE,
    allowNull: false
  }
},{
  timestamps: false
});

module.exports = Product;