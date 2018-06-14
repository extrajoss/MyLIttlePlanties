'use strict'
module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define('Plant', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  })
  Plant.associate = function (models) {
    Plant.belongsTo(models.Pot)
    Plant.belongsTo(models.PlantStage)
    Plant.belongsTo(models.PlantType)
  }
  return Plant
}
