const { body, validationResult } = require("express-validator");
const category = require("../models/category");

async function handleCategoryAdd(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  await body("name").notEmpty().withMessage("name field is required").run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, description } = req.body;

  try {
    const newCategory = await category.create({
      name: name,
      description: description,
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Category Created Successfully",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function handleGetAllCategory(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const categoryList = await category.find({
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Category List",
      data: categoryList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleGetCategoryById(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const id = req.params.id;

  try {
    const categoryData = await category.findById({ _id: id });

    return res.status(201).json({
      success: true,
      message: "Category Information!",
      data: categoryData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleUpdateCategory(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  await body("name").notEmpty().withMessage("name field is required").run(req);

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, description } = req.body;

  const id = req.params.id;

  try {
    await category.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
      }
    );
    return res.status(201).json({
      success: true,
      message: "Category Updated Successfully!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleDeleteCategory(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const id = req.params.id;

  try {
    await category.findByIdAndDelete({
      _id: id,
    });
    return res.status(201).json({
      success: true,
      message: "Category Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

module.exports = {
  handleCategoryAdd,
  handleGetAllCategory,
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
};
