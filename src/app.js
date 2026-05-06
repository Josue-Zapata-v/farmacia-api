import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Sincronizar base de datos
try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente');
} catch (error) {
    console.error('Error al conectar la base de datos:', error.message);
}

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Farmacia API funcionando' });
});

export default app;