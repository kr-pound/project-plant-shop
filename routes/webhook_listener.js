const express = require('express');
const router = express.Router();

const webhookListenerController = require('../controller/webhook_listener');

router.post('/:transaction_id', webhookListenerController.confirm_transaction);

module.exports = router;
