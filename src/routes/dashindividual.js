var express = require("express");
var router = express.Router();

var dashindividual = require("../controllers/dashindividual");

router.post("/buscardadosdash", function (req, res) {
    dashindividual.buscardados(req, res);
});


module.exports = router;