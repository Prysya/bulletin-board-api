const router = require('express').Router();

const routes = require('../config/routes');
const { checkIsAuth } = require('../middlewares/passport');
const { verifyById } = require('../middlewares/objectId');
const upload = require('../middlewares/multer');
const {
  getAllAdvertisements,
  getAdvertisementById,
  createNewAdvertisement,
  deleteAdvertisement,
} = require('../controllers/advertisementsApi');

router.get(routes.advertisements.basePath, getAllAdvertisements);
router.post(
  routes.advertisements.basePath,
  checkIsAuth,
  upload.array('images', 8),
  createNewAdvertisement,
);

router.get(routes.advertisements.advById, verifyById, getAdvertisementById);
router.delete(
  routes.advertisements.advById,
  verifyById,
  checkIsAuth,
  deleteAdvertisement,
);

module.exports = router;
