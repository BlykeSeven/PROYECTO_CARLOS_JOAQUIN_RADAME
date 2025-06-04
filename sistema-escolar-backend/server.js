const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Middleware
app.use(cors());
app.use(express.json());

// Verificación de la conexión a PostgreSQL
pool.connect()
  .then(client => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err.stack);
  });

// Formatear la fecha para que se guarde correctamente como 'YYYY-MM-DD' (sin la hora)
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0]; // Solo la parte de la fecha (YYYY-MM-DD)
};

// Rutas para manejar operaciones CRUD de Alumnos
app.get('/api/alumnos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
    res.status(500).json({ message: 'Error al obtener alumnos' });
  }
});

app.post('/api/alumnos', async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, direccion } = req.body;
  const fechaFormateada = formatDate(fecha_nacimiento);

  try {
    const result = await pool.query(
      'INSERT INTO alumnos (nombre, apellido, fecha_nacimiento, direccion) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, fechaFormateada, direccion]
    );
    res.status(201).json(result.rows[0]); // Devolver el nuevo alumno agregado
  } catch (error) {
    console.error('Error al agregar alumno:', error);
    res.status(500).json({ message: 'Error al agregar alumno' });
  }
});

// Ruta para editar un alumno
app.put('/api/alumnos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fecha_nacimiento, direccion } = req.body;
  const fechaFormateada = formatDate(fecha_nacimiento);

  try {
    const result = await pool.query(
      'UPDATE alumnos SET nombre = $1, apellido = $2, fecha_nacimiento = $3, direccion = $4 WHERE id = $5 RETURNING *',
      [nombre, apellido, fechaFormateada, direccion, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.json(result.rows[0]); // Devolver el alumno actualizado
  } catch (error) {
    console.error('Error al actualizar alumno:', error);
    res.status(500).json({ message: 'Error al actualizar alumno' });
  }
});

// Ruta para eliminar un alumno
app.delete('/api/alumnos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM alumnos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.json({ message: 'Alumno eliminado', alumno: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar alumno:', error);
    res.status(500).json({ message: 'Error al eliminar alumno' });
  }
});

// Rutas para manejar operaciones CRUD de Maestros
app.get('/api/maestros', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM maestros');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener maestros:', error);
    res.status(500).json({ message: 'Error al obtener maestros' });
  }
});

app.post('/api/maestros', async (req, res) => {
  const { nombre, apellido, materia_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO maestros (nombre, apellido, materia_id) VALUES ($1, $2, $3) RETURNING *',
      [nombre, apellido, materia_id]
    );
    res.status(201).json(result.rows[0]); // Devolver el nuevo maestro agregado
  } catch (error) {
    console.error('Error al agregar maestro:', error);
    res.status(500).json({ message: 'Error al agregar maestro' });
  }
});

// Ruta para editar un maestro
app.put('/api/maestros/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, materia_id } = req.body;

  try {
    const result = await pool.query(
      'UPDATE maestros SET nombre = $1, apellido = $2, materia_id = $3 WHERE id = $4 RETURNING *',
      [nombre, apellido, materia_id, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Maestro no encontrado' });
    }
    res.json(result.rows[0]); // Devolver el maestro actualizado
  } catch (error) {
    console.error('Error al actualizar maestro:', error);
    res.status(500).json({ message: 'Error al actualizar maestro' });
  }
});

// Ruta para eliminar un maestro
app.delete('/api/maestros/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM maestros WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Maestro no encontrado' });
    }
    res.json({ message: 'Maestro eliminado', maestro: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar maestro:', error);
    res.status(500).json({ message: 'Error al eliminar maestro' });
  }
});

// Rutas para manejar operaciones CRUD de Materias
app.get('/api/materias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM materias');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener materias:', error);
    res.status(500).json({ message: 'Error al obtener materias' });
  }
});

app.post('/api/materias', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO materias (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]);  // Devolver la nueva materia agregada
  } catch (error) {
    console.error('Error al agregar materia:', error);
    res.status(500).json({ message: 'Error al agregar materia' });
  }
});

// Ruta para editar una materia
app.put('/api/materias/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE materias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json(result.rows[0]); // Devolver la materia actualizada
  } catch (error) {
    console.error('Error al actualizar materia:', error);
    res.status(500).json({ message: 'Error al actualizar materia' });
  }
});

// Ruta para eliminar una materia
app.delete('/api/materias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM materias WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }
    res.json({ message: 'Materia eliminada', materia: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar materia:', error);
    res.status(500).json({ message: 'Error al eliminar materia' });
  }
});

// Ruta para obtener todos los cursos
app.get('/api/cursos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cursos');
    res.json(result.rows);  // Devuelve todos los cursos
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    res.status(500).json({ message: 'Error al obtener cursos' });
  }
});

// Ruta para agregar un curso
app.post('/api/cursos', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cursos (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    res.status(201).json(result.rows[0]); // Devolver el curso agregado
  } catch (error) {
    console.error('Error al agregar curso:', error);
    res.status(500).json({ message: 'Error al agregar curso' });
  }
});

// Ruta para editar un curso
app.put('/api/cursos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cursos SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json(result.rows[0]); // Devolver el curso actualizado
  } catch (error) {
    console.error('Error al actualizar curso:', error);
    res.status(500).json({ message: 'Error al actualizar curso' });
  }
});

// Ruta para eliminar un curso
app.delete('/api/cursos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM cursos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json({ message: 'Curso eliminado', curso: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar curso:', error);
    res.status(500).json({ message: 'Error al eliminar curso' });
  }
});

// Ruta para obtener las inscripciones con alumno y curso
app.get('/api/inscripciones', async (req, res) => {
  try {
    // Obtener las inscripciones con los nombres de los alumnos y cursos
    const result = await pool.query(`
      SELECT 
        inscripciones.id,
        alumnos.nombre AS alumno_nombre,
        cursos.nombre AS curso_nombre,
        inscripciones.fecha_inscripcion
      FROM inscripciones
      JOIN alumnos ON inscripciones.alumno_id = alumnos.id
      JOIN cursos ON inscripciones.curso_id = cursos.id
    `);
    res.json(result.rows); // Mostrar las inscripciones
  } catch (error) {
    console.error('Error al obtener inscripciones:', error);
    res.status(500).json({ message: 'Error al obtener inscripciones' });
  }
});

// Ruta para agregar una inscripción
app.post('/api/inscripciones', async (req, res) => {
  const { alumno_id, curso_id, fecha_inscripcion } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO inscripciones (alumno_id, curso_id, fecha_inscripcion) VALUES ($1, $2, $3) RETURNING *',
      [alumno_id, curso_id, fecha_inscripcion]
    );
    res.status(201).json(result.rows[0]); // Devolver la inscripción agregada
  } catch (error) {
    console.error('Error al agregar inscripción:', error);
    res.status(500).json({ message: 'Error al agregar inscripción' });
  }
});

// Ruta para editar una inscripción
app.put('/api/inscripciones/:id', async (req, res) => {
  const { id } = req.params;
  const { alumno_id, curso_id, fecha_inscripcion } = req.body;

  const fechaFormateada = formatDate(fecha_inscripcion);

  try {
    const result = await pool.query(
      'UPDATE inscripciones SET alumno_id = $1, curso_id = $2, fecha_inscripcion = $3 WHERE id = $4 RETURNING *',
      [alumno_id, curso_id, fechaFormateada, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }
    res.json(result.rows[0]); // Devolver la inscripción actualizada
  } catch (error) {
    console.error('Error al actualizar inscripción:', error);
    res.status(500).json({ message: 'Error al actualizar inscripción' });
  }
});

// Ruta para eliminar una inscripción
app.delete('/api/inscripciones/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM inscripciones WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }
    res.json({ message: 'Inscripción eliminada', inscripcion: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar inscripción:', error);
    res.status(500).json({ message: 'Error al eliminar inscripción' });
  }
});

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});

// Ruta para obtener todas las notas con sus alumnos y materias
app.get('/api/notas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        notas.id,
        alumnos.nombre AS alumno_nombre,
        materias.nombre AS materia_nombre,
        notas.nota
      FROM notas
      JOIN alumnos ON notas.alumno_id = alumnos.id
      JOIN materias ON notas.materia_id = materias.id
    `);
    res.json(result.rows); // Mostrar las notas con alumnos y materias
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ message: 'Error al obtener notas' });
  }
});

// Ruta para agregar una nueva nota
app.post('/api/notas', async (req, res) => {
  const { alumno_id, materia_id, nota } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO notas (alumno_id, materia_id, nota) VALUES ($1, $2, $3) RETURNING *',
      [alumno_id, materia_id, nota]
    );
    res.status(201).json(result.rows[0]); // Devolver la nota agregada
  } catch (error) {
    console.error('Error al agregar nota:', error);
    res.status(500).json({ message: 'Error al agregar nota' });
  }
});

// Ruta para editar una nota
app.put('/api/notas/:id', async (req, res) => {
  const { id } = req.params;
  const { alumno_id, materia_id, nota } = req.body;

  try {
    const result = await pool.query(
      'UPDATE notas SET alumno_id = $1, materia_id = $2, nota = $3 WHERE id = $4 RETURNING *',
      [alumno_id, materia_id, nota, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json(result.rows[0]); // Devolver la nota actualizada
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ message: 'Error al actualizar nota' });
  }
});

// Ruta para eliminar una nota
app.delete('/api/notas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM notas WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    res.json({ message: 'Nota eliminada', nota: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ message: 'Error al eliminar nota' });
  }
});
