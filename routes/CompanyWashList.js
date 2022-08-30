const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/CompanyWashList');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/CompanyWashList.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:wash_list_id', checkAuth, controller.getOne);
router.patch('/:wash_list_id', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:wash_list_id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Company_Id/:company_id', checkAuth, controller.getByCompany_Id);
router.get('/getby/Wash_Type/:wash_type', checkAuth, controller.getByWash_Type);
module.exports = router;
