const { pool } = require("../app.js");

exports.getAsignaturas = async (req, res) => {
  try {
    const query = `
      SELECT id_asignatura AS id,
             nombre_asignatura,
             periodo,
             grado
      FROM asignaturas
    `;

    const [rows] = await pool.execute(query);
    res.json(rows);
  } catch (error) {
    console.error("no se pueden traer los datos de la asignatura", error.message);
    res.status(500).json({ error: "Error interno del servidor al listar asignaturas." });
  }
};
