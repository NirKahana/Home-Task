'use strict';
const people = require('../data/people')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('People', people, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', people, {});
  }
};
