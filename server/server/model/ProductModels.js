let mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: false,
  },
  productName: {
    type: String,
    required: false,
  },
  offerPrice: {
    type: Number,
    required: false,
  },
  cancelledprice: {
    type: Number,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  multipleColorImage: [
    {
      productImage: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
    },
  ],
  size: [
    {
      productSize: {
        type: String,
        required: false,
      },
    },
  ],
  offer: [
    {
      productOffer: {
        type: String,
        required: false,
      },
    },
  ],
  description: [
    {
      productDescription: {
        type: String,
        required: false,
      },
    },
  ],
  wishList: {
    type: Boolean,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

let ProductModels = mongoose.model("product", productSchema);
module.exports = ProductModels;
