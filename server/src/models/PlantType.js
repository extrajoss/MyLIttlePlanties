'use strict'
module.exports = (sequelize, DataTypes) => {
  const PlantType = sequelize.define('PlantType', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: DataTypes.STRING
  })
  PlantType.associate = function (models) {
    PlantType.hasMany(models.Plant)
  }
  return PlantType
}
