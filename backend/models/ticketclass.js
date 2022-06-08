'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class TicketClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      TicketClass.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' })
    }
  }
  TicketClass.init({
    eventbriteId: {
      type: DataTypes.STRING,
      unique: true
    },
    retrievedAt: DataTypes.DATE,

    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    currency: DataTypes.STRING,
    quantityTotal: DataTypes.INTEGER,
    quantitySold: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM,
      values: [
        'paid',
        'free',
        'donation'
      ]
    },
    salesStartDate: DataTypes.DATE,
    salesEndDate: DataTypes.DATE,

    eventId: DataTypes.INTEGER,

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'Event'
  })
  return TicketClass
}
