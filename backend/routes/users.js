var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const UserModel = require("../Models/User-model");
const productModel = require("../Models/Product-model");
const CompanyModel = require("../Models/Company-model");

/* GET users listing. */
router.get("/", async (req, res) => {
  UserModel.findOne(
    { email: new RegExp("^" + req.body.email + "$", "i") },
    function (err, resp) {
      if (resp) {
        console.log(resp);
        res.status(200).json({ products: resp.products });
      } else {
        res.status(400).json({ products: "Finns inga" });
      }
    }
  );
});

router.post("/", async (req, res) => {
  // console.log(req.body.email);
  // console.log(req.body._id);

  let productId = req.body._id;
  let user;
  UserModel.findOne(
    { email: new RegExp("^" + req.body.email + "$", "i") },
    function (err, doc) {
      console.log("i den", doc);
      if (doc) {
        user = doc;
        //hämtar id
        //func

        productModel.findById(productId, function (err, result) {
          if (result) {
            //kollar så de inte redan har sparat den
            result.favorited = true;
            user.productList.push(result);
            user.save();
            // user.productList.forEach((i) => {
            //   if (result._id.toString() == i._id.toString()) {
            //     console.log("finns redan");
            //     res.status(200).send({ result: "finns redan" });
            //     return;
            //   } else {
            //     console.log(result._id.toString());

            //     console.log("läggs till");
            res.status(200).send({ result: "läggs till", user });
          } else {
            console.log("error : ", err);
            res.status(400).send({ error: err });
          }
        });
        // console.log("USer", user);
      } else {
        res.status(400).send({ error: err });
        console.log("Finns inget");
      }
    }
  );
});

module.exports = router;
