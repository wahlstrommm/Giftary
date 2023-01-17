const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../Models/User-model");
const companyModel = require("../Models/Company-model");

//Loggar in användare. Decryptar lösen etc.
router.post("/", async (req, res) => {
  //checkar först om det är en "vanlig användaer" eller företag som loggar in.
  let test = req.body;
  console.log(test);
  if ("email" in test) {
    let testUser;
    userModel.findOne({ email: req.body.email }, function (err, data) {
      testUser = data;
      if (testUser === null) {
        return res.send("finns ingen användare");
      } else {
        try {
          bcrypt.compare(
            req.body.password,
            testUser.password,
            function (err, response) {
              if (err) {
                console.log("fel" + err);
              }
              if (response) {
                let confirmLoggin = {
                  isAllowed: response,
                  _id: testUser._id,
                  firstName: testUser.firstName,
                  lastName: testUser.lastName,
                  sex: testUser.sex,
                  phome: testUser.phone,
                  email: req.body.email,
                  productList: testUser.productList,
                };
                res.json(confirmLoggin);
              } else {
                res.send("Fail fel lösen");
                return console.log({
                  success: false,
                  message: "passwords do not match",
                });
              }
            }
          );
        } catch {
          console.log(err);
          res.setHeader(500).send(err, "Fel");
        }
      }
    });
  } else {
    let testCompany;
    companyModel.findOne(
      { orgNumber: req.body.orgNumber },
      function (err, data) {
        testCompany = data;
        if (testCompany === null) {
          return res.send("finns ingen användare");
        } else {
          try {
            bcrypt.compare(
              req.body.password,
              testCompany.password,
              function (err, response) {
                if (err) {
                  console.log("fel" + err);
                }
                if (response) {
                  let confirmLoggin = {
                    isAllowed: response,
                    _id: testCompany._id,
                    name: testCompany.name,
                    orgNumber: testCompany.orgNumber,
                    products: testCompany.products,
                  };
                  res.json(confirmLoggin);
                } else {
                  res.send("Fail fel lösen");
                  return console.log({
                    success: false,
                    message: "passwords do not match",
                  });
                }
              }
            );
          } catch {
            console.log(err);
            res.setHeader(500).send(err, "Fel");
          }
        }
      }
    );
  }
});

module.exports = router;
