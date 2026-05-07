import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import medicamentoRoutes from './routes/medicamentoRoutes.js';
import laboratorioRoutes from './routes/laboratorioRoutes.js';
import ordenCompraRoutes from './routes/ordenCompraRoutes.js';
import ordenVentaRoutes from './routes/ordenVentaRoutes.js';
import especialidadRoutes from './routes/especialidadRoutes.js';
import tipoMedicamentoRoutes from './routes/tipoMedicamentoRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

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
app.use('/api/medicamentos', medicamentoRoutes);
app.use('/api/laboratorios', laboratorioRoutes);
app.use('/api/compras', ordenCompraRoutes);
app.use('/api/ventas', ordenVentaRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/tipos', tipoMedicamentoRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Farmacia API funcionando',
        endpoints: {
            auth: '/api/auth',
            medicamentos: '/api/medicamentos',
            laboratorios: '/api/laboratorios',
            compras: '/api/compras',
            ventas: '/api/ventas',
            especialidades: '/api/especialidades',
            tipos: '/api/tipos'
        }
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada.' });
});

export default app;