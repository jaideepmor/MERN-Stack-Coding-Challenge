const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('../backend/routes/transactionRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});