const express = require('express');
const router = express.Router();

const typeWithCareController = require('../controller/type_with_care');

// Middleware
const validateParamCategoryId = require('../middleware/validate_param_category_id');

router.post('/', typeWithCareController.createTypeWithCare);

router.get('/', validateParamCategoryId, typeWithCareController.getAllTypesWithCares);
router.get('/available_lists', typeWithCareController.getAllPlantTypes);

router.get('/:id', typeWithCareController.getTypeWithCare);

router.put('/:id', typeWithCareController.updateTypeWithCare);

router.delete('/:id', typeWithCareController.deleteTypeWithCare);
router.delete('/', typeWithCareController.deleteAllTypesWithCares);

module.exports = router;
