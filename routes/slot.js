const express = require('express');
const router = express.Router();

const slotWithStateController = require('../controller/slot_with_state');

// Middleware
const validateParamMachineId = require('../middleware/validate_param_machine_id');

router.get('/', validateParamMachineId, slotWithStateController.getAllSlotsWithStates);
router.get('/:id', validateParamMachineId, slotWithStateController.getSlotWithState);

module.exports = router;
