const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const reservasRouter = require('./routes/reservas');

dotenv.config();

const app = express();

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection(process.env.DATABASE_URL);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to PlanetScale:', err);
    return;
  }
  console.log('Connected to PlanetScale!');
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta base para las reservas
app.use('/api', reservasRouter);

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Otros middlewares y rutas...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
