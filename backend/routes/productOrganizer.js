var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const CompanyModel = require("../Models/Company-model");
const productModel = require("../Models/Product-model");
const CategoryModel = require("../Models/Category-model");
/* GET all products. */
router.get("/", async (req, res) => {
  console.log(req.body);
  productModel.find({}).then(function (products) {
    try {
      if (products) {
        res.status(200).send(products);
      } else {
        res.json({ message: "Nåt gick fel" });
      }
    } catch (error) {
      res.send(500).json({ message: error });
    }
  });
});

router.get("/sort/:category", async (req, res) => {
  console.log(req.params.category);
  let category = req.params.category;
  let find = await productModel.find({
    category: category,
  });
  let result = await find;
  if (find.length > []) {
    res.status(200).json(result);
  } else {
    res.json({ "Finns inga": find });
  }
});

router.post("/:id", async (req, res) => {
  console.log(req.body);
  let productId = req.params.id;
  let find = await productModel.find({
    _id: mongoose.Types.ObjectId(productId),
  });
  console.log("FIND", find);
  if (find) {
    //had to change it to a string else i get the object
    let productID = find[0]._id.toString();
    //send back the product aswell as the url for the front to handle it.
    res.status(200).json({
      url: "http://localhost:3002/product/" + productID,
      Foundproduct: find[0],
    });
  } else {
    res.status(500).json({ message: "Fel" });
  }
});

module.exports = router;
