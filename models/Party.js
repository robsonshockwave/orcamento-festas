const mongoose = require('mongoose');
const { Schema } = mongoose;

const { serviceSchema } = require('./Service');

const partySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    services: {
      type: [serviceSchema],
      default: [
        // Example of a default service
        // {
        //   name: 'Default Service',
        //   description: 'This is a default service description.',
        //   price: 0,
        //   image: 'default-service.jpg',
        // },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Party = mongoose.model('Party', partySchema);

module.exports = { Party };
