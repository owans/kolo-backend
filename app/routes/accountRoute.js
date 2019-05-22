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

router.get("/id", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Please Specify Header"
      });
    }
    const token = authHeader.split(" ")[1];
    const tokendata = jwt.verify(token, env.JWT_SECRET);
    const account_details = await accountmodel.findById(tokendata.id);

    res.json({
      status: "success",
      data: account_details
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "error",
      message: err.message
    });
  }
});


module.exports = router;