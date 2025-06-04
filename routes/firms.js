const express = require('express');
const router = express.Router();
const firmController = require('../controllers/firmController');

router.get('/', firmController.getAllFirms);

module.exports = router;
