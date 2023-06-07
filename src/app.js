const express = require('express');
const cors = require('cors');
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

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta base para las reservas
app.use('/api', reservasRouter);

// Otros middlewares y rutas...

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
