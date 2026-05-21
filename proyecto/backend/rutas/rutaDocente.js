//en base al control del docente
//lo conecta con la asignatura

const express = require("express");
const router = express.Router();
const panelController = require("../controlesRoles/controlDocente");

router.get("/asignaturas", panelController.getAsignaturas);

module.exports = router;
