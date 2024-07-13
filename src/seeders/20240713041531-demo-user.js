'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //Users tên của table
    await queryInterface.bulkInsert('User', [
      {
        username: 'John Doe1',
        email: 'jd1@gmail.com',
        password: '123',
      },
      {
        username: 'John Doe2',
        email: 'jd2@gmail.com',
        password: '123',
      },
      {
        username: 'John Doe3',
        email: 'jd3@gmail.com',
        password: '123',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
