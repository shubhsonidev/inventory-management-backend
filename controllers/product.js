const { body, validationResult } = require("express-validator");
const { default: axios } = require("axios");
const product = require("../models/product");
const category = require("../models/category");

async function handleProductAdd(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  await body("name").notEmpty().withMessage("name field is required").run(req);
  await body("price")
    .notEmpty()
    .withMessage("price field is required")
    .isNumeric()
    .withMessage("price must be a number only")
    .run(req);
  await body("productCategory").notEmpty().withMessage("category field is required").run(req);

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, quantity, price, description, productImage, productCategory } = req.body;

  console.log(productCategory);

  try {
    const isCategory = await category.findById(productCategory);

    if (!isCategory) {
      return res.status(400).json({
        success: false,
        message: "Category not found !",
      });
    }

    if (isCategory.createdBy !== req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Access denied: You do not have access to this resource : {category}",
      });
    }

    let response;
    if (productImage) {
      const postData = {
        key: process.env.IMGBB_KEY,
        image: productImage,
      };

      const formData = new FormData();
      formData.append("key", postData.key);
      formData.append("image", postData.image);

      response = await axios.post("https://api.imgbb.com/1/upload", postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data.data.url) {
        return res.status(500).json({
          success: false,
          message: "File upload error occured: internal server error",
        });
      }
    }
    let newProduct;

    if (productImage) {
      newProduct = await product.create({
        name: name,
        quantity: quantity,
        description: description,
        price: price,
        category: isCategory._id,
        productImage: response.data.data.url,
        createdBy: req.user._id,
      });
    } else {
      newProduct = await product.create({
        name: name,
        quantity: quantity,
        description: description,
        price: price,
        category: isCategory._id,
        createdBy: req.user._id,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product added successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleGetAllProducts(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  try {
    const productList = await product.find({
      createdBy: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Product List",
      data: productList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleGetProductById(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const id = req.params.id;

  try {
    const productData = await product.findById({ _id: id });

    if (productData.createdBy !== req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Access denied: You do not have access to this resource",
        data: productData,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product Information!",
      data: productData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleUpdateProduct(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  await body("name").notEmpty().withMessage("name field is required").run(req);

  await body("price")
    .notEmpty()
    .withMessage("price field is required")
    .isNumeric()
    .withMessage("price must be a number only")
    .run(req);
  await body("category")
    .notEmpty()
    .withMessage("category field is required")
    .isNumeric()
    .withMessage("category must be the id only")
    .run(req);
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, price, description, category } = req.body;

  const id = req.params.id;

  try {
    const isCategory = await category.findById(productCategory);

    if (!isCategory) {
      return res.status(400).json({
        success: false,
        message: "Category not found !",
      });
    }

    if (isCategory.createdBy !== req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Access denied: You do not have access to this resource : {category}",
      });
    }

    const productData = await product.findById(id);

    if (productData.createdBy !== req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Access denied: You do not have access to this resource : {product}",
      });
    }

    await product.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        price: price,
      }
    );
    return res.status(201).json({
      success: true,
      message: "Product Updated Successfully!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleDeleteProduct(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const id = req.params.id;

  try {
    const productData = product.findById(id);

    if (productData.createdBy !== req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Access denied: You do not have access to this resource : {product}",
      });
    }

    await product.findByIdAndDelete({
      _id: id,
    });
    return res.status(201).json({
      success: true,
      message: "Product Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

async function handleUpdateQuantity(req, res) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }
  await body("quantity")
    .notEmpty()
    .withMessage("quantity field is required !")
    .isNumeric()
    .withMessage("quantity must be a number")
    .run(req);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { quantity } = req.body;

  const id = req.params.id;

  try {
    const productData = await product.findById(id);
    if (productData.createdBy !== req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Access denied: You do not have access to this resource : {product}",
      });
    }

    await product.findByIdAndUpdate(
      { _id: id },
      {
        quantity: quantity,
      }
    );
    return res.status(201).json({
      success: true,
      message: "Quantity Updated Successfully!",
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
  handleProductAdd,
  handleGetAllProducts,
  handleGetProductById,
  handleUpdateProduct,
  handleDeleteProduct,
  handleUpdateQuantity,
};
