const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('../backend/routes/transactionRoutes');
const uri = "mongodb+srv://jaideepmor74:t0d%40y%2417@jaideep.az1sqez.mongodb.net/Jaideep?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(uri);

app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});