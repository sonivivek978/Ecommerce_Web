let Product = require("../model/ProductModels");

exports.GetProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.GetProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found with id " + req.params.id });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res
          .status(404)
          .send({ message: "User not found with id " + req.params.id });
      }
    });
};

exports.CreateProduct = async (req, res) => {
  const data = new Product({
    companyName: req.body.companyName,
    productName: req.body.productName,
    offerPrice: req.body.offerPrice,
    cancelledprice: req.body.cancelledprice,
    discount: req.body.discount,
    multipleColorImage: req.body.multipleColorImage,
    size: req.body.size,
    offer: req.body.offer,
    description: req.body.description,
    rating: req.body.rating,
    wishlist: req.body.wishlist,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
