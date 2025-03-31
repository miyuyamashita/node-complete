const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/',adminController.getIndex);
router.get('/get-product-list',adminController.getAdminProduct);

router.get('/get-add-product',adminController.getAddProduct);
router.post('/post-add-product',adminController.postAddProduct);

router.post('/post-delete',adminController.postDelete);

router.get('/get-edit-product/:id',adminController.getEditProduct);
router.post('/post-edit-product',adminController.postEditProduct);

module.exports = router;