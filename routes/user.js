const express = require("express");
const { handleUserSignup, handleUserSignin, handleUserLogout } = require("../controllers/user");

const router = express.Router();

router.post("/signup", handleUserSignup);

router.post("/signin", handleUserSignin);

router.get("/logout", handleUserLogout);

module.exports = router;
