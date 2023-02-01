const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../Models/User-model");
var ObjectID = require("mongodb").ObjectID;

router.get("/:id", async (req, res) => {
  //   console.log(req.params.id);
  let userID = req.params.id;
  try {
    let find = await userModel.find({ _id: userID });
    if (find) {
      res.status(200).json({ find });
    } else {
      res.status(400).json({ message: "Något gick fel.." });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/:id", async (req, res) => {
  //   console.log(req.params.id);
  let userID = req.params.id;
  try {
    let find = await userModel.updateOne(
      { _id: userID },
      { $set: { productList: [] } }
    );

    if (find) {
      res.status(200).json({ find });
    } else {
      res.status(400).json({ message: "Något gick fel.." });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
module.exports = router;
