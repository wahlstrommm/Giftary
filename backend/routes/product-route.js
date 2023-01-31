const express = require("express");
const CompanyModel = require("../Models/Company-model");
const router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../Models/Product-model");
// const UserModel = require("../Models/User-model");
// const multer = require("multer");

router.get("/:company", async (req, res) => {
  // console.log("HEJ", req.params.company, req.body);
  // console.log("HEJ2", req.body);
  CompanyModel.findOne(
    { name: new RegExp("^" + req.params.company + "$", "i") },
    function (err, resp) {
      if (resp) {
        // console.log(resp);
        res.status(200).json({ products: resp.products });
      } else {
        res.status(400).json({ products: "Finns inga", test: resp });
      }
    }
  );
});
// ! IF OM DET INTE FINNS NÅGRA PRODUKTER
router.post("/", async (req, res) => {
  const product = await productModel.create(req.body);
  const companyName = req.body.companyName;
  // console.log("Innan", companyName);
  CompanyModel.findOne(
    { name: new RegExp("^" + companyName + "$", "i") },
    function (err, doc) {
      console.log("i den", doc);
      if (doc) {
        // console.log(doc.products);
        doc.products.push(product);
        doc.save();
      } else {
        console.log("Finns inget");
      }
    }
  );
  res.status(200).json({
    message: "Produkten är nu skapad!",
    status: res.status,
    product: product,
  });
});
// router.get("/sort", async (req, res) => {
//   console.log(req.body.category);
//   let find = await productModel.find({
//     category: req.body.category,
//   });
//   let result = await find;
//   if (find.length > []) {
//     res.status(200).json(result);
//   } else {
//     res.json({ "Finns inga": find });
//   }
// });

router.get("/", async (req, res) => {
  productModel.find({}).then(function (products) {
    res.send(products);
  });
  // res.send("Hello from PUT endpoint");
});

router.post("/details/:id", async (req, res) => {
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
