const router = require('express').Router();

const routes = require('../config/routes');
const userRoute = require('./user');
const advertisementsRoute = require('./advertisements');
const errorRoute = require('./errors');

/* api routes */
router.use(routes.basePath, userRoute);
router.use(routes.basePath, advertisementsRoute);

/* error route */
router.use(errorRoute);

module.exports = router;
