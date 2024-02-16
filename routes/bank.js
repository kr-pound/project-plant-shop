const express = require('express');
const router = express.Router();

const bankController = require('../controller/bank');

router.get('/:plant_id', bankController.request_purchase);

module.exports = router;
