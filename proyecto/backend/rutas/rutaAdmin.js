//esta ruta toma los datos del control administrador 
//y los envia al registro 

const express = require("express");
const router = express.Router();
const userController = require("../controlesRoles/controlAdmin");

// Esta ruta será accesible en: http://localhost:3000/api/usuarios
router.get("/usuarios", userController.getUsuarios);
router.post("/usuarios", userController.registrarUsuario);

module.exports = router;