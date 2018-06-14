'use strict'
module.exports = (sequelize, DataTypes) => {
  const PlantStage = sequelize.define('PlantStage', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: DataTypes.STRING
  })
  PlantStage.associate = function (models) {
    PlantStage.hasMany(models.Plant)
  }
  return PlantStage
}
