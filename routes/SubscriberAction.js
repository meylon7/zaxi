const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/SubscriberAction');
const bodyValidator = require("../middleware/bodyValidator");
const updateValidator = require("../middleware/updateValidator");
const createDto = require('../dto/SubscriberAction.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:action_id', checkAuth, controller.getOne);
router.patch('/:action_id', checkAuth, updateValidator(createDto), controller.update);
router.delete('/:action_id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

router.get('/getby/Subscriber_Id/:subscriber_id', checkAuth, controller.getBySubscriber_Id);
module.exports = router;
