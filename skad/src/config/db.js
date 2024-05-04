const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    console.log("process.env.MONGO_STRING",process.env.MONGO_STRING)
    await mongoose.connect(process.env.MONGO_STRING);
    mongoose.set("debug",true)
    console.log('Connection Established!!');
  } catch (error) {
    console.error('Connection Failed!!',error);
  }
};

module.exports = connectDB;
