const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).type("text/plain").send("ok");
});

module.exports = router;
