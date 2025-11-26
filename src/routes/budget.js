const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/budgetController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, ctrl.setBudget);
router.get('/status', auth, ctrl.budgetStatus);

module.exports = router;
