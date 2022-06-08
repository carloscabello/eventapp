'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {})
      */
    await queryInterface.bulkInsert('Events',
      [
        // All events are initialized only with the eventbriteId
        // Later, all events' data will be retrieved through the EventbriteAPI and saved

        // Software Engineers' Gymkhana
        { eventbriteId: '358418879517' },
        // Eventapp Hackathon
        { eventbriteId: '358734282897' },
        // 0 A.D. game tournament
        { eventbriteId: '358823900947' },
        // Full-stack workshop
        { eventbriteId: '358819748527' },
        // Single ticket Event
        { eventbriteId: '358751544527' },
        // Round table discussion
        { eventbriteId: '358830420447' }
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {})
       */
    const { sequelize } = queryInterface
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction }
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options)
        await sequelize.query('TRUNCATE TABLE TicketClasses', options)
        await sequelize.query('TRUNCATE TABLE Events', options)
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
