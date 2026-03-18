// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // process.env.MONGO_URI is pulled from your hidden .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`🔥 Southampton Scene DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Stop the app if the database fails
  }
};

module.exports = connectDB;