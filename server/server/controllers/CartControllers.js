let allProduct = require("../model/ProductModels");

exports.AddCart = (req, res) => {
  const { userId, productId } = req.params;
  console.log("productId: ", productId);
  console.log("userId: ", userId);
  allProduct.findById(productId).then((data) => console.log(data, "------->"));
  
  try {

  } catch (error) {

  }
};
