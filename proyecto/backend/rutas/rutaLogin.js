//en base al control login o inicio 
//se conecta directamente con el archivo login

const express = require("express");
const router = express.Router();
const authController = require("../controlesRoles/controlLogin");

router.post("/login", authController.login);

module.exports = router;