const express = require("express");
const router = express.Router();
const {
  GetProduct,
  GetProductById,
  CreateProduct,
} = require("../controllers/productControllers");

router.post("/vs/product/create", CreateProduct);
router.get("/vs/product/:id", GetProductById);
router.get("/vs/product", GetProduct);

module.exports = router;
