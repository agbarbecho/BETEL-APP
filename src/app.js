import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/client.routes.js'; 
import patientRoutes from './routes/patient.routes.js';
import adminRoutes from './routes/admin.routes.js';
import hospitalizationRoutes from './routes/hospitalization.routes.js';
import hospedajeRoutes from './routes/hospedaje.routes.js'; 
import { pool } from './db.js';
import { ORIGIN } from './config.js';

import { isAuth, isAdmin, isVeterinarian, isAdminOrVeterinarian } from './middlewares/auth.middleware.js';

const app = express();

// Middlewares
app.use(cors({
  origin: ORIGIN,
  credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas públicas
app.get('/', (req, res) => res.json({ message: 'Welcome to my API' }));
app.get('/api/ping', async (req, res) => { 
  const result = await pool.query('SELECT NOW()');
  return res.json(result.rows[0]);
});
app.use('/api', authRoutes);

// Rutas protegidas
app.use('/api/admin', isAuth, isAdmin, adminRoutes);
app.use('/api/veterinario', isAuth, isAdminOrVeterinarian, clientRoutes, patientRoutes, hospitalizationRoutes, hospedajeRoutes); 

// Servir archivos estáticos
import path from 'path';
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// Configurar el manejo de rutas del frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
});

export default app;
