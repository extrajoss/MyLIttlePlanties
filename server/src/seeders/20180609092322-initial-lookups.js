'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var now = new Date()
    return queryInterface.bulkInsert('PlantStages', [{
      description: 'Stage1',
      createdAt: now,
      updatedAt: now
    }, {
      description: 'Stage2',
      createdAt: now,
      updatedAt: now
    }, {
      description: 'Stage3',
      createdAt: now,
      updatedAt: now
    }, {
      description: 'Stage4',
      createdAt: now,
      updatedAt: now
    }, {
      description: 'Stage5',
      createdAt: now,
      updatedAt: now
    }, {
      description: 'Stage6',
      createdAt: now,
      updatedAt: now
    }], {}).then(() => {
      return queryInterface.bulkInsert('PlantTypes', [{
        description: 'Bamboo',
        createdAt: now,
        updatedAt: now
      }, {
        description: 'Flower',
        createdAt: now,
        updatedAt: now
      }, {
        description: 'Moss',
        createdAt: now,
        updatedAt: now
      }], {})
    }).then(() => {
      return queryInterface.bulkInsert('ToolTypes', [{
        description: 'WateringCan',
        createdAt: now,
        updatedAt: now
      }, {
        description: 'Spade',
        createdAt: now,
        updatedAt: now
      }], {})
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
