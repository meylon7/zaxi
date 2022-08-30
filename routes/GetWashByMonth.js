const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../models/GetWashByMonth');
const createDto = require('../dto/GetByMonth.dto.js');
const router = express.Router();

router.get('/:month/:year', checkAuth, controller.getWashByMonth);
router.post('/:month/:year', checkAuth, bodyValidator(createDto), controller.getWashByMonth);
router.delete('/:company_id/:month/:year', checkAuth, controller.getCompanyWashByMonth);
router.post('/:company_id/:month/:year', checkAuth, bodyValidator(createDto), controller.getCompanyWashByMonth);
module.exports = router;