'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pot = sequelize.define('Pot', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  })
  Pot.associate = function (models) {
    Pot.belongsTo(models.Garden)
    Pot.hasMany(models.Plant)
  }
  return Pot
}
