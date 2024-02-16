const express = require('express');
const router = express.Router();

const staffController = require('../controller/staff');

router.post('/', staffController.validateLogin);

module.exports = router;
