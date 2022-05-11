const router = require('express').Router();

const routes = require('../config/routes');
const { authenticate } = require('../middlewares/passport');
const { signin, signup } = require('../controllers/authApi');

router.post(routes.user.signup, signup);
router.post(routes.user.signin, authenticate, signin);

module.exports = router;
