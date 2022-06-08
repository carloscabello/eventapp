'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Event.init({
    eventbriteId: {
      type: DataTypes.STRING,
      unique: true
    },
    retrievedAt: DataTypes.DATE,

    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    summary: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUri: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: [
        'draft',
        'live',
        'started',
        'ended',
        'completed',
        'canceled'
      ]
    },
    isOnline: DataTypes.BOOLEAN,

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
  return Event
}
