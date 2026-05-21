require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const adminRouter = require('./rutas/rutaAdmin');
const authRouter = require('./rutas/rutaLogin');
const docenteRouter = require('./rutas/rutaDocente');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('¡Hola, mundo! Este es mi servidor con Express.');
});

app.use('/api', adminRouter);
app.use('/api', authRouter);
app.use('/api', docenteRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada.' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});