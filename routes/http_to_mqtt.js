const express = require('express');
const router = express.Router();

const httpToMqttController = require('../controller/http_to_mqtt');

router.patch('/request_open/:plant_id', httpToMqttController.requestOpen);
router.patch('/request_close/:plant_id', httpToMqttController.requestClose);

router.patch('/request_pick_up/:plant_id', httpToMqttController.requestPickup);

module.exports = router;
