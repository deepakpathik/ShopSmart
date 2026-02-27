const express = require('express');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/rbac');
const upload = require('../middlewares/upload');
const {
  createProduct,
  getProducts,
  getTopProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/top', getTopProducts);

router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'SELLER'),
  upload.single('image'),
  createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SELLER'),
  upload.single('image'),
  updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN', 'SELLER'),
  deleteProduct
);

module.exports = router;
