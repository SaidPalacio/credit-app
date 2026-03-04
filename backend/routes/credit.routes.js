const express = require('express');
const router = express.Router();
const controller = require('../controllers/credit.controller');

router.post('/', controller.createCredit);
router.get('/', controller.getCredits);

module.exports = router;
