const transactionService = require('../services/transactionService');

exports.initializeDatabase = async (req, res) => {
    try {
        const result = await transactionService.initializeDatabase();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.listTransactions = async (req, res) => {
    // Controller logic for listing transactions
    try {
        const { month, search = '', page = 1 } = req.query;

        const transactions = await transactionService.listTransactions(month, search, page);

        res.status(200).json({ transactions });
    } catch(error) {
        console.error('Error in listTransactions controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;
  
        // Validate and convert the month parameter
        const monthIndex = parseInt(month);
        if (isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) {
        return res.status(400).json({ error: 'Invalid month parameter' });
        }
  
        // Get statistics from the service
        const statistics = await transactionService.getStatistics(month);
    
        res.status(200).json(statistics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Other controller actions for statistics, bar chart, and pie chart