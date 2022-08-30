const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/Subscribers');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/Subscribers.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:subscriber_id', checkAuth, controller.getOne);
router.patch('/:subscriber_id', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:subscriber_id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Car_Type/:car_type', checkAuth, controller.getByCar_Type);
router.get('/getby/Service_Type/:service_type', checkAuth, controller.getByService_Type);
router.get('/getby/Wash_Type/:wash_type', checkAuth, controller.getByWash_Type);
module.exports = router;
