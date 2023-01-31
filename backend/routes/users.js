var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../Models/User-model");
const productModel = require("../Models/Product-model");
var ObjectID = require("mongodb").ObjectID;

/* GET users listing. */
router.post("/", async (req, res) => {
  userModel.findOne(
    { email: new RegExp("^" + req.body.email + "$", "i") },
    function (err, resp) {
      if (resp) {
        console.log(resp);
        res.status(200).json({ products: resp.productList });
      } else {
        res.status(400).json({ products: "Finns inga" });
      }
    }
  );
});

//For adde a product to thier list
router.post("/:id", async (req, res) => {
  //gets the product id from params
  let productId = req.params.id;
  //finds it
  let find = await productModel.findOne({
    _id: productId,
  });

  //Then i set it to true for future feature of hard and soft delete
  find.favorited = true;
  // console.log("FIND!!!!!", find.favorited);

  //Gets the user so i can add the item to thier list
  userModel.findOne({ email: req.body.email }, function (err, doc) {
    if (doc) {
      doc.productList.push(find);
      doc.save();
      res.json({ result: doc });
    } else {
      console.log("Finns inget");
      res.json({ error: "fel" });
    }
  });
});

module.exports = router;
