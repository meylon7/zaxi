const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/ServiceType');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/ServiceType.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:service_id', checkAuth, controller.getOne);
router.patch('/:service_id', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:service_id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;
