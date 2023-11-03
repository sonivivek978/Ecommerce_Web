let allProduct = require("../model/ProductModels");
let cart = require("../model/CartModels");

exports.AddCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const Product = await allProduct.findById(productId);
    const cartProduct = await cart.find({ userId: userId });
    const isUser = cartProduct.find((x) => x.userId === userId);

    if (Product && userId) {
      if (isUser) {
        isUser.cartProduct.push(Product);
        await isUser.save();
        res.status(200).json("Product successfully add to cart");
      } else {
        const data = new cart({
          userId: userId,
          cartProduct: Product,
        });
        await data.save();
        res.status(200).json("Product successfully add to cart");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.GetCart = async (req, res) => {
  console.log("req: ", req.params);
  try {
    const getCart = await cart.findById(req.params.id);
    if (getCart) {
      res.send(getCart);
    } else {
      res
        .status(400)
        .send({ message: "User not found with id " + req.params.id });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
