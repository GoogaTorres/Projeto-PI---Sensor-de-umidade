var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.post("/carregarDash", function (req, res) {
    dashController.carregarDash(req, res);
});

module.exports = router;