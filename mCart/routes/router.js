const express=require('express');
const service=require('../sevices/service');
const router=express.Router();

router.get('/login',service.login);
router.post('/signup',service.signup);
router.get('/tablets',service.getTablets);
router.get('/mobiles',service.getMobiles);
router.route('/carts')
    .get(service.getCarts)
    .post(service.addToCart);
router.route('/carts/:username')
    .get(service.getUserCart)
    .put(service.updateUserCart);
router.post('/orders/:username',service.addUserOrder);
router.delete('/products/:productId',service.deleteProduct);
router.all('*',service.invalid);

module.exports=router;