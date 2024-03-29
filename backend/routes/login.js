const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../Models/User-model");
const companyModel = require("../Models/Company-model");

//Loggar in användare. Decryptar lösen etc.
router.post("/", async (req, res) => {
  //checks if its a reagular user or company that is trying to loggin.
  if (req.body.email) {
    let testUser;
    userModel.findOne({ email: req.body.email }, function (err, data) {
      testUser = data;
      if (testUser === null) {
        return res.json({
          message: "Fel inloggningsuppgifter!",
          status: res.status,
        });
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
                  phone: testUser.phone,
                  email: req.body.email,
                  productList: testUser.productList,
                };
                res.json({
                  message: "Ni är nu inloggad!",
                  status: res.status,
                  user: confirmLoggin,
                });
              } else {
                res.json({
                  success: false,
                  message: "Fel lösenord eller email",
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
          res.json({
            message: "Fel inloggningsuppgifter!",
            status: res.status,
          });

          return;
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
                  res.json({
                    message: "Du är nu inloggad!",
                    status: res.status,
                    company: confirmLoggin,
                  });
                } else {
                  res.json({
                    message: "Fel lösenord eller email!",
                    status: res.status,
                    success: false,
                  });
                  return;
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
