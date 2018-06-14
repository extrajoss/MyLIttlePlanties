const models = require('../models')

const Pot = models.Pot
const Garden = models.Garden
const Plant = models.Plant

async function createPot (values) {
  let pot = await Pot.findOne({ where: { id: values.id } })
  if (pot === null) {
    pot = await Pot.create({ GardenId: values.Garden.id })
  }
  let garden = await Garden.findOne({where: {id: pot.GardenId}, include: [Pot]})
  return models.unwrapInstance(garden)
}

function updatePot (values) {
  return Pot.findOne({ where: { id: values.id } }).then(pot => {
    if (pot) {
      return pot.updateAttributes(values).then(models.unwrapInstance)
    } else {
      return null
    }
  })
}

function fetchPot (values) {
  return Pot.findOne({ where: values, include: [ Plant ] })
    .then(pot => {
      if (pot) {
        return models.unwrapInstance(pot)
      } else {
        return null
      }
    })
}

async function deletePot (values) {
  let pot = await Pot.findOne({ where: { id: values.id } })
  if (pot) {
    await Pot.destroy({ where: { id: values.id } })
    let garden = await Garden.findOne({where: {id: pot.GardenId}, include: [Pot]})
    return models.unwrapInstance(garden)
  } else {
    return null
  }
}

module.exports = {
  createPot,
  fetchPot,
  updatePot,
  deletePot
}
