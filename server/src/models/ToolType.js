'use strict'
module.exports = (sequelize, DataTypes) => {
  const ToolType = sequelize.define('ToolType', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: DataTypes.STRING
  })
  ToolType.associate = function (models) {
    ToolType.hasMany(models.Tool)
  }
  return ToolType
}
