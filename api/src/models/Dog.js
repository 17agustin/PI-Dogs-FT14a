const { Sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
  id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
  created:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  height:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  age:{
      type: DataTypes.STRING,
      allowNull: true,
    },
  image:{
      type: DataTypes.TEXT,
      allownull: true,
    },
  },{timestamps:false});
};