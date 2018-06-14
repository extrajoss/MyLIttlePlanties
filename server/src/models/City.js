'use strict'
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  })
  return City
}
