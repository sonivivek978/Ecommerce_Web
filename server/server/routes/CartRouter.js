const express = require("express");
const router = express.Router();
const { AddCart } = require("../controllers/CartControllers");

router.post("/vs/cart/:userId/product/:productId", AddCart);

module.exports = router;
