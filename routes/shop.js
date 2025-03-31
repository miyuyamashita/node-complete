const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/get-shop',shopController.getShop);
router.get('/get-cart',shopController.getCart);
router.get('/get-order',shopController.getOrder);

router.post('/post-add-to-cart',shopController.postAddToCart);
router.post('/post-delete',shopController.postDelete);
router.post('/post-cart',shopController.postCart);

module.exports = router;