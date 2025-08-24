const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@partytime.fqciyvt.mongodb.net/?retryWrites=true&w=majority&appName=partytime`
    );

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = main;
