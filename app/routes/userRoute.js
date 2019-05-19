const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JoiValidator = require("../middlewares/auth");
const { CreateUserValidator } = require("../../validator/userValidator");
const usermodel = require("../../models/usermodel");
const accountmodel = require("../../models/accountModel");
const router = express.Router();
const env = require("../../env");

//Create User
router.post("/", JoiValidator(CreateUserValidator), async function(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.confirmpassword = await bcrypt.hash(req.body.confirmpassword, 10);
    const user = await usermodel.create(req.body);

    const userobj = user.toJSON();
    delete userobj.password;
    delete userobj.confirmpassword;

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      status: "success",
      data: { user: userobj, token }
    });
  } catch (err) {
    console.log(err);

    res.json({
      status: "error",
      message: " 😞 an error occurred while creating your account"
    });
  }
});

//Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Please specify a header"
      });
    }
    const token = authHeader.split(" ")[1];
    const tokendata = jwt.verify(token, env.JWT_SECRET);
    const user = await usermodel.findById(tokendata.id);
    res.json({
      status: "success",
      data: user
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err.message
    });
  }
});

//Login User
router.post("/login", async (req, res) => {
  try {
    const user = await usermodel.findOne(
      { email: req.body.email },
      "+password"
    );

    if (!user) {
      res.json({
        status: "error",
        message: "invalid account"
      });
    }

    const ispasswordvalid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!ispasswordvalid) {
      res.json({
        status: "error",
        message: "invalid account"
      });
    }
    const token = jwt.sign({ id: user.id }, env.JWT_SECRET);

    const account = await accountmodel.findOne({ email: req.body.email });

    if (!account) {
      res.json({
        status: "error",
        message: "account not verified",
        token
      });
    }

    // const token = jwt.sign({ id: user.id }, env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: "An error occurred while creating a user"
    });
  }
});

//Get all user details
router.get("/", async function(req, res) {
  try {
    const user = await usermodel.find();

    res.status(200).json({
      status: "success",
      data: user
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: " 😞 an error occured while getting all user account"
    });
  }
});

module.exports = router;