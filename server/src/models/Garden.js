'use strict'
module.exports = (sequelize, DataTypes) => {
  const Garden = sequelize.define('Garden', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  })
  Garden.associate = function (models) {
    Garden.belongsTo(models.City)
    Garden.belongsTo(models.User)
    Garden.hasMany(models.Pot)
    Garden.hasOne(models.Shed)
  }
  return Garden
}
