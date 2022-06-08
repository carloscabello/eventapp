'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    // Events table
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventbriteId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        unique: true
      },
      retrievedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },

      title: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      summary: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      imageUri: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('draft', 'live', 'started', 'ended', 'completed', 'canceled')
      },
      isOnline: {
        type: Sequelize.BOOLEAN
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })

    await queryInterface.addIndex(
      'Events',
      {
        fields: ['eventbriteId'],
        unique: true
      }
    )

    await queryInterface.addIndex(
      'Events',
      {
        fields: ['startDate']
      }
    )

    // TicketClasses table
    await queryInterface.createTable('TicketClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventbriteId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        unique: true
      },
      retrievedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },

      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      currency: {
        type: Sequelize.STRING
      },
      quantityTotal: {
        type: Sequelize.INTEGER
      },
      quantitySold: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('paid', 'free', 'donation')
      },
      salesStartDate: {
        type: Sequelize.DATE
      },
      salesEndDate: {
        type: Sequelize.DATE
      },

      eventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Events'
          },
          key: 'id'
        }
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })

    await queryInterface.addIndex(
      'TicketClasses',
      {
        fields: ['eventbriteId'],
        unique: true
      }
    )
    await queryInterface.addIndex(
      'TicketClasses',
      {
        fields: ['price']
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('TicketClasses')
    await queryInterface.dropTable('Events')
  }
}
