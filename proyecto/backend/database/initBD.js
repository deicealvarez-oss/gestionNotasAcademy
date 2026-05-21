const mysql = require("mysql2/promise");
const { pool, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require("../app.js");

async function initDB() {
  const tempPool = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
  });

//POOl reutiliza las conexiones 
//gestiona mejor las conexiones de la base de datos 
  try {
    await tempPool.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(' Base de datos verificada.');

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS roles (
        id_rol VARCHAR(10) PRIMARY KEY,
        nombre_rol VARCHAR(100) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario VARCHAR(12) PRIMARY KEY,
        nombre_usuario VARCHAR(100) NOT NULL,
        correo_usuario VARCHAR(150) NOT NULL UNIQUE,
        direccion VARCHAR(255),
        telefono VARCHAR(20),
        contraseña_usuario VARCHAR(255) NOT NULL,
        id_rol_usuario VARCHAR(10) NOT NULL,
        FOREIGN KEY (id_rol_usuario) REFERENCES roles(id_rol)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS asignaturas (
        id_asignatura INT AUTO_INCREMENT PRIMARY KEY,
        nombre_asignatura VARCHAR(100) NOT NULL,
        periodo VARCHAR(100) NOT NULL,
        grado VARCHAR(100) NOT NULL,
        UNIQUE KEY uq_asignatura (nombre_asignatura, periodo, grado)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`INSERT IGNORE INTO roles (id_rol, nombre_rol) VALUES 
      ('ADM', 'Administrador'), ('EST', 'Estudiante'), ('PROF', 'Profesor')
    `);

    // Admin inicial
    const [rows] = await pool.execute(`SELECT id_usuario FROM usuarios WHERE id_rol_usuario = 'ADM' LIMIT 1`);
    if (rows.length === 0) {
      await pool.execute(
        `INSERT IGNORE INTO usuarios (id_usuario, nombre_usuario, correo_usuario, direccion, telefono, contraseña_usuario, id_rol_usuario) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['U000000001', 'Administrador', 'admin@admin.com', 'Sede Principal', '3000000000', 'admin123', 'ADM']
      );
      console.log('👤 Admin creado: admin@admin.com / admin123');
    }
  } catch (err) {
    console.error("error al ingresar la base de datos", err.message);
    throw err;
    await tempPool.end();
  }
}

module.exports = initDB;