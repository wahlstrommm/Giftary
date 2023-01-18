const express = require("express");
const CompanyModel = require("../Models/Company-model");
const router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../Models/Product-model");
const UserModel = require("../Models/User-model");
router.get("/", async (req, res) => {
  CompanyModel.findOne(
    { name: new RegExp("^" + req.body.companyName + "$", "i") },
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
// ! IF OM DET INTE FINNS NÅGRA PRODUKTER
router.post("/", async (req, res) => {
  const product = await productModel.create(req.body);
  const companyName = req.body.companyName;
  console.log("Innan", companyName);
  CompanyModel.findOne(
    { name: new RegExp("^" + companyName + "$", "i") },
    function (err, doc) {
      console.log("i den", doc);
      if (doc) {
        console.log(doc.products);
        doc.products.push(product);
        doc.save();
      } else {
        console.log("Finns inget");
      }
    }
  );
  res.status(200).json(product);
});
router.get("/sort", async (req, res) => {
  console.log(req.body.category);
  let find = await productModel.find({
    category: req.body.category,
  });
  let result = await find;
  if (find.length > []) {
    res.status(200).json(result);
  } else {
    res.json({ "Finns inga": find });
  }
});

router.put("/", async (req, res) => {
  res.send("Hello from PUT endpoint");
});

router.get("/:id", async (req, res) => {
  console.log(req.body.id);
  let productId = req.body.id;
  let find = await productModel.find({
    _id: mongoose.Types.ObjectId(productId),
  });
  console.log(find);

  //res.rediect + id???
  res.status(200).json(find);
});
module.exports = router;
