const express = require("express");
const router = express.Router();
const { AddCart, GetCart } = require("../controllers/CartControllers");

router.post("/vs/cart/:userId/product/:productId", AddCart);
router.get("/vs/cart/:id",GetCart);

module.exports = router;
