const express = require("express");
const router = express.Router();

const controller = require("../controllers/mainController");

router.get("/", controller.index);
router.post("/", controller.index);

router.get("/contacto", controller.mensaje);
router.post("/contacto", controller.mensaje);

// router.route("/enviar-email")
// .post(function(req, res){
//     var nombre = req.body.name;
//     var email = req.body.email;
//     var mensaje = req.body.comments;
//     console.log(nombre, email, mensaje);
// });

module.exports = router;