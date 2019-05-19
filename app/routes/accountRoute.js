const express = require("express");
const jwt = require("jsonwebtoken");
const JoiValidator = require("../middlewares/auth");
const { CreateAccountValidator } = require("../../validator/accountValidator");
const accountmodel = require("../../models/accountModel");
const router = express.Router();
const env = require("../../env");

//create an account route
router.post("/", JoiValidator(CreateAccountValidator), async function(req, res) {
  try {
    const account = await accountmodel.create(req.body);
    const accountobj = account.toJSON();
    const token = jwt.sign({ id: account.id }, env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({
      status: "success",
      data: { account: accountobj, token }
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: " 😞 an error occured while creating your account"
    });
  }
});


module.exports = router;