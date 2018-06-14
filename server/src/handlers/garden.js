const models = require('../models')

const Garden = models.Garden

function createGarden (values) {
  let gardenId = { UserId: values.User.id, CityId: values.City.id }
  return Garden.findOne({ where: gardenId })
    .then(garden => {
      if (garden === null) {
        return Garden.create(gardenId).then(models.unwrapInstance)
      }
    })
}

function updateGarden (values) {
  return Garden.findOne({ where: { id: values.id } })
    .then(garden => {
      if (garden) {
        return garden.updateAttributes(values).then(models.unwrapInstance)
      } else {
        return null
      }
    })
}

function fetchGarden (values) {
  return Garden.findOne({ where: { id: values.id }, include: [ models.City, models.Pot ] })
    .then(garden => {
      if (garden) {
        return models.unwrapInstance(garden)
      } else {
        return null
      }
    })
}

function fetchGardens (values) {
  return Garden.findAll({ where: { UserId: values.User.id }, include: [ models.City ] })
    .then(gardens => {
      if (gardens) {
        return gardens.map(garden => { return models.unwrapInstance(garden) })
      } else {
        return null
      }
    })
}

function deleteGarden (values) {
  return Garden.findOne({ where: { id: values.id } })
    .then(garden => {
      if (garden) {
        return Garden.destroy({ where: { id: values.id } })
      }
    })
}

module.exports = {
  createGarden,
  fetchGarden,
  fetchGardens,
  updateGarden,
  deleteGarden
}
