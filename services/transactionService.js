const axios = require('axios');
const Transaction = require('../models/transactionModel');

exports.listTransactions = async (month, search = '', page = 1) => {
  // Service logic for fetching transactions based on parameters
  try {
    let query = {};
    
    if (month) {
      const startDate = new Date(`${month}-01T00:00:00.000Z`);
      const endDate = new Date(`${month}-31T23:59:59.999Z`);

      // Check if startDate and endDate are valid dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date range');
      }

      query.dateOfSale = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const regex = new RegExp(search, 'i');

    query.$or = [
      { title: { $regex: regex } },
      { description: { $regex: regex } },
    ];

    // Check if search can be parsed into a number
    const numericSearch = parseFloat(search);
    if (!isNaN(numericSearch)) {
      query.$or.push({ price: { $gte: numericSearch, $lt: numericSearch + 1 } });
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * 10)
      .limit(10);

    return transactions;
  } catch (error) {
    console.error('Error in listTransactions service:', error);
    throw new Error('Error fetching transactions');
  }
};

exports.initializeDatabase = async () => {
    // Service logic for initializing the database
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        await Transaction.deleteMany({});
        await Transaction.insertMany(data);

        return { message: 'Database initialized successfully' };
    } catch (error) {
        throw new Error('Error initializing database');
    }
};

// Other service actions for statistics, bar chart, and pie chart