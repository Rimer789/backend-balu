const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.DATABASE_URL);

// Ruta para realizar una reserva
// Ruta para realizar una reserva
router.post('/reservas', async (req, res) => {
    const { nombre, fecha_hora } = req.body;
  
    // Verificar si ya existe una reserva en la misma hora
    const query = 'SELECT COUNT(*) AS count FROM reservas WHERE fecha_hora = ?';
    const params = [fecha_hora];
  
    try {
      const [results, fields] = await connection.promise().query(query, params);
      const count = results[0].count;
  
      if (count > 0) {
        return res.status(400).json({ error: 'Ya existe una reserva con la misma fecha y hora. Por favor, elige otra fecha y hora.' });
      }
  
      // Insertar la reserva en la base de datos
      const insertQuery = 'INSERT INTO reservas (nombre, fecha_hora) VALUES (?, ?)';
      const insertParams = [nombre, fecha_hora];
  
      await connection.promise().query(insertQuery, insertParams);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Reemplaza con la URL de tu frontend
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(201).json({ message: 'Reserva registrada correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar la reserva. Por favor, intenta nuevamente.' });
    }
  });
  
  

// Ruta para obtener todas las reservas
// Ruta para obtener las reservas del día actual
router.get('/reservas', async (req, res) => {
    try {
      // Obtener la fecha actual en formato YYYY-MM-DD
      const currentDate = new Date().toISOString().split('T')[0];
      
      const query = 'SELECT * FROM reservas WHERE DATE(fecha_hora) = ?';
      const [results, fields] = await connection.promise().query(query, [currentDate]);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las reservas.' });
    }
  });
  
  

module.exports = router;
