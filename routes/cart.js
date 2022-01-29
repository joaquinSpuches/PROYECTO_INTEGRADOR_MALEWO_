var express = require("express");
var router = express.Router();
const cartController = require("../controllers/cartController");


router.get('/compras', cartController.compras);
router.post('/saveProductToCart/:id', cartController.saveProduct);
router.post('/confirmedBuy', cartController.confirmedBuy)
router.post('/deleteItemFromCart/:id', cartController.deleteItemFromCart)




module.exports = router;