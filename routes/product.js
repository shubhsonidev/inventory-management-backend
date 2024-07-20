const express = require("express");
const {
  handleProductAdd,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
  handleUpdateQuantity,
} = require("../controllers/product");
const router = express.Router();

router.post("/add", handleProductAdd);

router.get("/", handleGetAllProducts);

router.get("/:id", handleGetProductById);

router.put("/update/:id", handleUpdateProduct);

router.put("/update/quantity/:id", handleUpdateQuantity);

router.delete("/delete/:id", handleDeleteProduct);

module.exports = router;
