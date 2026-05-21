const { pool } = require("../app.js");


//sirve para traer los datos de verificacion de contraseña 
// y si genera un mensage al usuario
exports.login = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ success: false, error: "Correo y contraseña son obligatorios." });
  }

  try {
    const query = `
      SELECT u.id_usuario AS id,
             u.nombre_usuario AS nombre,
             u.correo_usuario AS correo,
             u.direccion,
             u.telefono,
             u.id_rol_usuario AS rol,
             r.nombre_rol AS nombre_rol
      FROM usuarios u
      JOIN roles r ON u.id_rol_usuario = r.id_rol
      WHERE u.correo_usuario = ? AND u.contraseña_usuario = ?
      LIMIT 1
    `;

    const [rows] = await pool.execute(query, [correo, password]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: "Correo o contraseña incorrectos." });
    }

    const user = rows[0];
    res.json({ success: true, user });
  } catch (error) {
    console.error("error de contraseña", error.message);
    res.status(500).json({ success: false, error: "Error interno del servidor." });
  }
};