let allProduct = require("../model/ProductModels");

exports.AddCart = async(req, res) => {
  const { userId, productId } = req.params;
  const { size } = req.body;
  try {
    //Get all product
    const Product = await allProduct.findById(productId);
    const NewCart = {
      companyName: Product.companyName,
      productName: Product.productName,
      offerPrice: Product.offerPrice,
      cancelledprice: Product.cancelledprice,
      rating: Product.rating,
      multipleColorImage: Product.multipleColorImage,
      size: size,
      offer: Product.offer,
      description: Product.description,
      wishList: Product.wishList,
      image: Product.image,
      _id: Product._id,
    };

    if (!Product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }
    //Get all cart
    const cartProduct = await cart.find({ userId: userId });
    //Get specific id through all cart
    const isUser = cartProduct && cartProduct.find((x) => x.userId === userId);
    //check already product exist or not
    const isExistProduct =
      (await isUser) &&
      isUser.cartProduct.find((val) => val?._id.toString() === productId);
    if (isExistProduct) {
      res.status(400).json("Product already added into cart");
    } else {
      if (isUser) {
        isUser?.cartProduct.push(NewCart);
        await isUser.save();
        res.status(200).json("Product successfully add to cart");
      } else {
        const data = new cart({
          userId: userId,
          cartProduct: NewCart,
        });
        await data.save();
        res.status(200).json("Product successfully add to cart");
      }
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error: error });
  }
};

exports.GetCart = async (req, res) => {
  console.log('req: ', req.body);
  try {
    const getCart = await cart.findOne({ userId: req.params.id });
    console.log('req.params.id: ', req.params.id);
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

exports.DeleteCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const userCart = await cart.findOne({ userId });

    if (!userCart) {
      return res.status(404).json({ error: "User cart not found" });
    }

    const productIndex = userCart.cartProduct.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    userCart.cartProduct.splice(productIndex, 1);
    await userCart.save();
    res.status(200).json({ message: "Product successfully removed" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
