const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.listProduct);
router.get('/:slug', productController.listProductBySlug);
router.get('/tags/:tag', productController.listProductByTag);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/', productController.deleteProduct);

module.exports = router;