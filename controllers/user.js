const user = require("../models/user");
const axios = require("axios");
const { body, validationResult } = require("express-validator");
const { createHmac } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

async function handleUserSignup(req, res) {
  // Validation rules
  await body("fullName").notEmpty().withMessage("Full name is required").run(req);
  await body("email").isEmail().withMessage("Invalid email address").run(req);
  await body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").run(req);
  await body("mobileNumber")
    .isLength({ min: 10, max: 10 })
    .withMessage("mobiile must be at least 10 characters long")
    .isMobilePhone()
    .withMessage("Invalid mobile number")
    .run(req);

  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { fullName, email, password, mobileNumber, profileImageURL } = req.body;

  try {
    let response;
    if (profileImageURL) {
      const postData = {
        key: process.env.IMGBB_KEY,
        image: profileImageURL,
      };

      // Convert to FormData
      const formData = new FormData();
      formData.append("key", postData.key);
      formData.append("image", postData.image);

      try {
        response = await axios.post("https://api.imgbb.com/1/upload", postData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        return res.status(501).json({
          success: false,
          message: "File upload error occured",
        });
      }
    }
    const newUser = await user.create({
      fullName: fullName,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
      profileImageURL: response.data.data.url,
      role: "ADMIN",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        number: newUser.number,
        createdAt: newUser.createdAt,
        profileImageURL: newUser.profileImageURL,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
}

async function handleUserSignin(req, res) {
  await body("mobileNumber")
    .notEmpty()
    .withMessage("mobile number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("invalid mobile number")
    .isMobilePhone()
    .withMessage("invalid phone number")
    .run(req);
  await body("password").notEmpty().withMessage("password is required").run(req);

  const { mobileNumber, password } = req.body;

  const existingUser = await user.findOne({
    mobileNumber: mobileNumber,
  });

  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const salt = existingUser.salt;
  const storedHashedPassword = existingUser.password;

  const resHashedPassword = createHmac("sha256", salt).update(password).digest("hex");

  if (storedHashedPassword !== resHashedPassword) {
    return res.status(401).json({
      success: false,
      message: "Password is incorrect",
    });
  }

  const token = createTokenForUser(existingUser);
  return res
    .cookie("token", token)
    .status(200)
    .json({
      success: true,
      message: "User found and matched",
      data: {
        token: token,
      },
    });
}

async function handleUserLogout(req, res) {
  return res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully",
  });
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
};
