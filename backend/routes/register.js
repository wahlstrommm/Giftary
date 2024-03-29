const express = require("express");
const router = express.Router();
const userModel = require("../Models/User-model");
const bcrypt = require("bcrypt");
const companyModel = require("../Models/Company-model");

router.get("/", async (req, res) => {
  res.json({ "Hello from GET endpoint": req.body });
});

router.post("/", async (req, res) => {
  let userEmail = req.body.email;
  await userModel.findOne({ email: req.body.email }).then((data) => {
    userEmail = data;
    return userEmail;
  });
  if (userEmail) {
    res.status(400).json({
      message:
        "Blev något fel testa igen! Det verkar vara som denna mail används redan.",
    });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: req.body.sex,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        productList: req.body.productList,
      });

      try {
        const Newuser = await user.save();

        res.status(200).json({
          message: "Ert konto är nu skapat!",
          status: res.status,
          user: Newuser,
        });
        return;
      } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("error 400", error);
      }
    } catch (error) {
      console.log("eror", error);
      res.status(500).send(error.message);
    }
  }
});
router.post("/Company", async (req, res) => {
  let companyNum = req.body.orgNumber;
  await companyModel.findOne({ orgNumber: req.body.orgNumber }).then((data) => {
    companyNum = data;
    return companyNum;
  });
  if (companyNum) {
    res.status(400).json({
      message: "Det verkar vara som dessa uppgifter används redan.",
    });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const company = new companyModel({
        name: req.body.name,
        orgNumber: req.body.orgNumber,
        products: req.body.products,
        password: hashedPassword,
        companyName: req.body.companyName,
      });

      try {
        const newCompany = await company.save();
        res.json({
          message: "Ert konto är nu skapat!",
          status: res.status,
          company: newCompany,
        });

        return;
      } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("error 400", error);
      }
    } catch (error) {
      console.log("eror", error);
      res.status(500).send(error.message);
    }
  }
});

router.put("/", async (req, res) => {
  res.send("Hello from PUT endpoint");
});

router.delete("/:id", async (req, res) => {
  res.send("Hello from DELETE endpoint");
});
module.exports = router;
