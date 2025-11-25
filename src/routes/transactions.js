const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/transactionController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, ctrl.addTransaction);
router.get('/', auth, ctrl.listTransactions);

module.exports = router;
