var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const CompanyModel = require("../Models/Company-model");
const ProductModel = require("../Models/Product-model");
const CategoryModel = require("../Models/Category-model");
/* GET all products. */
router.get("/", function (req, res, next) {
  console.log(req.body);
  ProductModel.find({}).then(function (products) {
    try {
      if (products) {
        res.status(200).send(products);
      } else {
        res.json({ message: "Nåt gick fel" });
      }
    } catch (error) {
      res.send(500).json({ message: error });
    }
    // res.send(products);
  });
});
router.post("/", function (req, res, next) {
  //   res.render("index", { title: "Express" });
});

module.exports = router;
