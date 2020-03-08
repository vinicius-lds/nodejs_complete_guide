const fileUtils = require("../../utils/file-utils");
const pathUtils = require("../../utils/path-utils");
const Product = require("../../models/product-model");

module.exports.deleteProduct = (req, res, next) => {
  Product.findById({
    _id: req.params.productId,
    userId: req.session.user._id
  })
    .then(product => {
      fileUtils.delete(pathUtils.buildFilePath("public", product.imageUrl));
      return product.remove();
    })
    .then(r => {
      res.status(200).json({ message: "Success!" });
    })
    .catch(err => {
      res.status(500).json({ message: "Product Deletion Failed!" });
    });
};
