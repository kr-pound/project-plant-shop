const express = require('express');
const router = express.Router();

const machineWithLocationController = require('../controller/machine_with_location');

// Middleware
const validateParamStaffId = require('../middleware/validate_param_staff_id');

router.post('/', validateParamStaffId, machineWithLocationController.createMachineWithLocation);

router.get('/', validateParamStaffId, machineWithLocationController.getAllMachinesWithLocations);
router.get('/:id', validateParamStaffId, machineWithLocationController.getMachineWithLocation);

router.put('/:id', validateParamStaffId, machineWithLocationController.updateMachineWithLocation);

router.delete('/:id', validateParamStaffId, machineWithLocationController.deleteMachineWithLocation);
router.delete('/', validateParamStaffId, machineWithLocationController.deleteAllMachinesWithLocations);

module.exports = router;
