const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors");

const routes=require('./routes/todoroutes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

console.log('Starting server...');

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    console.error('Exiting process...');
    process.exit(1);
  });

  app.use(routes)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));