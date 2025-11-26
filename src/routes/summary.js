const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/summaryController');
const auth = require('../middleware/authMiddleware');

router.get('/monthly', auth, ctrl.monthlySummary);
router.get('/top-category', auth, ctrl.topCategory);

module.exports = router;
