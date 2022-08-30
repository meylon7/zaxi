const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/Users');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/Users.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:user_id', checkAuth, controller.getOne);
router.patch('/:user_id', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:user_id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;
