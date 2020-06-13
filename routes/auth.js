const express = require('express');
const router = express.Router();
const {userSignupValidator} = require('../validators');
//controller references
const { signup, signin } = require("../controllers/auth");

//routes
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);

module.exports = router;