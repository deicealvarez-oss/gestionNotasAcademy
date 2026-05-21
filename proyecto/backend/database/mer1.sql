
CREATE DATABASE IF NOT EXISTS db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db;

CREATE TABLE IF NOT EXISTS roles (
  id_rol VARCHAR(30) PRIMARY KEY,
  nombre_rol VARCHAR(30) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS grado (
  id_grado VARCHAR(12) PRIMARY KEY,
  Grado VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario VARCHAR(12) PRIMARY KEY,
  nombre_usuario VARCHAR(100) NOT NULL,
  correo_usuario VARCHAR(100) NOT NULL UNIQUE,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  contraseña_usuario VARCHAR(255) NOT NULL, 
  id_rol_usuario VARCHAR(30) NOT NULL,
  CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol_usuario) REFERENCES roles(id_rol) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS asignaturas (
  id_asignatura VARCHAR(12) PRIMARY KEY,
  nombre_asignatura VARCHAR(30) NOT NULL,
  periodo INT NOT NULL,
  id_grado VARCHAR(12) NOT NULL,
  CONSTRAINT fk_asignatura_grado FOREIGN KEY (id_grado) REFERENCES grado(id_grado)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notas (
  calificacion_nota FLOAT NOT NULL,
  fecha_date DATE NOT NULL,
  id_usuario VARCHAR(12) NOT NULL,
  id_asignatura VARCHAR(12) NOT NULL,
  PRIMARY KEY (id_usuario, id_asignatura, fecha_date),
  CONSTRAINT fk_notas_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
  CONSTRAINT fk_notas_asignatura FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura)
) ENGINE=InnoDB;

CREATE OR REPLACE VIEW vw_usuarios_con_rol AS
SELECT u.id_usuario AS id, u.nombre_usuario AS nombre, u.correo_usuario AS correo, u.direccion, u.telefono, r.nombre_rol AS rol
FROM usuarios u
JOIN roles r ON u.id_rol_usuario = r.id_rol;

INSERT IGNORE INTO roles (id_rol, nombre_rol) VALUES ('ADM', 'Administrador'), ('EST', 'Estudiante'),('PROF','Profesor');
INSERT IGNORE INTO grado (id_grado, Grado) VALUES ('G1', 'Primero');