const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/WashType');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/WashType.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:wash_id', checkAuth, controller.getOne);
router.patch('/:wash_id', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:wash_id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;
