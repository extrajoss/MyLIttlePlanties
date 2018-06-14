const models = require('../models')

const Pot = models.Pot
const Plant = models.Plant
const PlantType = models.PlantType
const PlantStage = models.PlantStage

async function createPlant (values) {
  let plant = await Plant.findOne({ where: { id: values.id } })
  if (plant === null) {
    plant = await Plant.create(values)
  }
  let pot = await Pot.findOne({where: {id: plant.PotId}, include: [Plant]})
  return models.unwrapInstance(pot)
}

function updatePlant (values) {
  return Plant.findOne({ where: { id: values.id } }).then(plant => {
    if (plant) {
      return plant.updateAttributes(values).then(models.unwrapInstance)
    } else {
      return null
    }
  })
}

function fetchPlant (values) {
  return Plant.findOne({ where: { id: values.id }, include: [ models.PlantType, models.PlantStage ] })
    .then(plant => {
      if (plant) {
        return models.unwrapInstance(plant)
      } else {
        return null
      }
    })
}

async function deletePlant (values) {
  let plant = await Plant.findOne({ where: { id: values.id } })
  if (plant) {
    await Plant.destroy({ where: { id: values.id } })
    let pot = await Pot.findOne({where: {id: plant.PotId}, include: [Plant]})
    return models.unwrapInstance(pot)
  } else {
    return null
  }
}

function fetchPlantTypes () {
  return PlantType.findAll().then(plantTypes => {
    if (plantTypes) {
      return plantTypes.map(plantType => { return models.unwrapInstance(plantType) })
    } else {
      return null
    }
  })
}

function fetchPlantStages () {
  return PlantStage.findAll().then(plantStages => {
    if (plantStages) {
      return plantStages.map(plantStage => { return models.unwrapInstance(plantStage) })
    } else {
      return null
    }
  })
}

module.exports = {
  createPlant,
  fetchPlant,
  updatePlant,
  deletePlant,
  fetchPlantTypes,
  fetchPlantStages
}
