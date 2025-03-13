// server/routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas públicas
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Rutas para administración (por ahora sin protección)
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;