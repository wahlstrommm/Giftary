const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  res.send("Hello from GET endpoint");
});
router.post("/", async (req, res) => {
  res.send("Hello from POST endpoint");
});
router.put("/", async (req, res) => {
  res.send("Hello from PUT endpoint");
});
router.delete("/:id", async (req, res) => {
  res.send("Hello from DELETE endpoint");
});
module.exports = router;
