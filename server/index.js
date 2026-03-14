require('dotenv').config(); // Load the variables
const express = require('express');
const app = express();

// Use the port from .env, or default to 5000 if it's missing
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});