const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/jwtVerify');
const tokenController = require('../controllers/token');
const uploadController = require('../controllers/upload');

const WashTypeRouter = require('./WashType');
const UsersRouter = require('./Users');
const SubscribersRouter = require('./Subscribers');
const SubscriberActionRouter = require('./SubscriberAction');
const ServiceTypeRouter = require('./ServiceType');
const CompanyWashListRouter = require('./CompanyWashList');
const CompanyRouter = require('./Company');
const CarsRouter = require('./Cars');
const CarTypesRouter = require('./CarTypes');


router.post('/token', tokenController.authLogin);
router.post('/upload', checkAuth, uploadController.uploadFile);

router.use('/WashType', WashTypeRouter);
router.use('/Users', UsersRouter);
router.use('/Subscribers', SubscribersRouter);
router.use('/SubscriberAction', SubscriberActionRouter);
router.use('/ServiceType', ServiceTypeRouter);
router.use('/CompanyWashList', CompanyWashListRouter);
router.use('/Company', CompanyRouter);
router.use('/Cars', CarsRouter);
router.use('/CarTypes', CarTypesRouter);

module.exports = router;
