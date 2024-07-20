const express = require("express");
const {
  handleCategoryAdd,
  handleGetAllCategory,
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
} = require("../controllers/category");
const router = express.Router();

router.post("/add", handleCategoryAdd);

router.get("/", handleGetAllCategory);

router.get("/:id", handleGetCategoryById);

router.put("/update/:id", handleUpdateCategory);

router.delete("/delete/:id", handleDeleteCategory);

module.exports = router;
