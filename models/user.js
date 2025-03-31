const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user',{
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  }
},{
  timestamps:false
});

module.exports = User;