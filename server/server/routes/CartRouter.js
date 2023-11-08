const express = require("express");
const router = express.Router();
const {
  AddCart,
  GetCart,
  DeleteCart,
} = require("../controllers/CartControllers");

router.post("/vs/cart/:userId/product/:productId", AddCart);
router.get("/vs/cart/:id", GetCart);
router.delete("/vs/cart/:userId/product/:productId", DeleteCart);

module.exports = router;
