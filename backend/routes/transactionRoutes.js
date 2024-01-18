const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/initialize-database', transactionController.initializeDatabase);
router.get('/list', transactionController.listTransactions);
router.get('/statistics', transactionController.getStatistics);

// Other routes for statistics, bar chart, and pie chart

module.exports = router;