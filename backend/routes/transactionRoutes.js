const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/initialize-database', transactionController.initializeDatabase);
router.get('/list', transactionController.listTransactions);
router.get('/statistics', transactionController.getStatistics);
router.get('/bar-chart', transactionController.getBarChartData);
router.get('/pie-chart', transactionController.getPieChartData);
router.get('/combined-data', transactionController.getCombinedData);

// Other routes for statistics, bar chart, and pie chart

module.exports = router;