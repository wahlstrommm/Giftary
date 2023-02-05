var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../Models/Product-model");
/* GET all products. */
router.get("/", async (req, res) => {
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
  let productId = req.params.id;
  let find = await productModel.find({
    _id: mongoose.Types.ObjectId(productId),
  });
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
