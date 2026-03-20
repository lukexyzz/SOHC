require('dotenv').config(); // Load the variables
const express = require('express');
const app = express();
const showRoutes = require('./routes/showRoutes');
const connectDB = require('./config/db');
const cors = require("cors")

// Connect to the database!
connectDB();

// Use the port from .env, or default to 5000 if it's missing
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/api/shows', showRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});