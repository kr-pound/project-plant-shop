const express = require('express');
const router = express.Router();

const plantManagementController = require('../controller/plant_management');

router.patch('/:id', plantManagementController.requestChangePlantState);

module.exports = router;
