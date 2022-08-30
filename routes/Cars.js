const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/Cars');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/Cars.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:car_number', checkAuth, controller.getOne);
router.patch('/:car_number', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:car_number', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Company_Id/:company_id', checkAuth, controller.getByCompany_Id);
router.get('/getby/Car_Type/:car_type', checkAuth, controller.getByCar_Type);
module.exports = router;
