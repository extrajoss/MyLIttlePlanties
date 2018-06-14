'use strict'
module.exports = (sequelize, DataTypes) => {
  const Tool = sequelize.define('Tool', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  })
  Tool.associate = function (models) {
    Tool.belongsTo(models.Shed)
    Tool.belongsTo(models.ToolType)
  }
  return Tool
}
