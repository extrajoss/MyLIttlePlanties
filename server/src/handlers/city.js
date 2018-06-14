const models = require('../models')

const City = models.City

function createCity (values) {
  return City.findOne({ where: { id: values.id } }).then(city => {
    if (city === null) {
      return City.create(values).then(models.unwrapInstance)
    }
  })
}

function updateCity (values) {
  return City.findOne({ where: { id: values.id } }).then(city => {
    if (city) {
      return city.updateAttributes(values).then(models.unwrapInstance)
    } else {
      return null
    }
  })
}

function fetchCity (values) {
  return City.findOne({ where: values }).then(city => {
    if (city) {
      return models.unwrapInstance(city)
    } else {
      return null
    }
  })
}

function deleteCity (values) {
  return City.findOne({ where: { id: values.id } }).then(city => {
    if (city) {
      return City.destroy().then(models.unwrapInstance)
    }
  })
}

module.exports = {
  createCity,
  fetchCity,
  updateCity,
  deleteCity
}
