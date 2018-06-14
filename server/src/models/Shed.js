'use strict'
module.exports = (sequelize, DataTypes) => {
  const Shed = sequelize.define('Shed', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  })
  Shed.associate = function (models) {
    Shed.belongsTo(models.Garden)
    Shed.hasMany(models.Tool)
  }
  return Shed
}
