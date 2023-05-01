const express = require('express');
const router = express.Router();

const plantWithDetailController = require('../controller/plant_with_detail');

// Middleware
const validateParamMachineId = require('../middleware/validate_param_machine_id');
const validateParamCategoryId = require('../middleware/validate_param_category_id');

router.post('/', validateParamMachineId, plantWithDetailController.createPlantWithDetail);

router.get('/', validateParamCategoryId, validateParamMachineId, plantWithDetailController.getAllPlantsWithDetails);
router.get('/:id', validateParamMachineId, plantWithDetailController.getPlantWithDetail);

router.put('/:id', validateParamMachineId, plantWithDetailController.updatePlantWithDetail);

router.delete('/:id', validateParamMachineId, plantWithDetailController.deletePlantWithDetail);

module.exports = router;
