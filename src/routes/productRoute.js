const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.get);
router.get('/:slug', productController.getBySlug);
router.get('/tags/:tag', productController.getByTag);
router.post('/', productController.post);
router.put('/:id', productController.put);
router.delete('/', productController.delete);

module.exports = router;