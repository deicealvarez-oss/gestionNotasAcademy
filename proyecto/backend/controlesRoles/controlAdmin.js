const { pool } = require('../app.js');

exports.getUsuarios = async (req, res) => {
  try {
    const query = `
      SELECT u.id_usuario AS id,
             u.nombre_usuario AS nombre,
             u.correo_usuario AS correo,
             u.direccion,
             u.telefono,
             r.nombre_rol AS rol
      FROM usuarios u
      JOIN roles r ON u.id_rol_usuario = r.id_rol
    `;

    const [rows] = await pool.execute(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).json({ success: false, error: 'Error interno al obtener usuarios.' });
  }
};

exports.registrarUsuario = async (req, res) => {
  const { nombre, correo, direccion, telefono, password, rol } = req.body;

  if (!nombre || !correo || !password || !rol) {
    return res.status(400).json({ success: false, error: 'Faltan datos obligatorios para registrar el usuario.' });
  }

  try {
    const query = `
      INSERT INTO usuarios (
        nombre_usuario,
        correo_usuario,
        direccion,
        telefono,
        contraseña_usuario,
        id_rol_usuario
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      nombre,
      correo,
      direccion,
      telefono,
      password,
      rol
    ]);

    res.json({ success: true, message: 'Usuario almacenado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error de registro:', error.message);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, error: 'El correo electrónico ya está registrado.' });
    }

    res.status(500).json({ success: false, error: 'No se pudo guardar el usuario en la base de datos.' });
  }
};