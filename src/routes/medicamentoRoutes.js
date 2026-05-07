import { Router } from 'express';
import {
    crearMedicamento,
    listarMedicamentos,
    obtenerMedicamento,
    actualizarMedicamento,
    eliminarMedicamento
} from '../controllers/medicamentoController.js';
import { verifyToken } from '../middlewares/auth.js';
import { verifyRole } from '../middlewares/roles.js';

const router = Router();

// Todos necesitan token
router.use(verifyToken);

// Cualquier rol autenticado puede listar y ver
router.get('/', listarMedicamentos);
router.get('/:id', obtenerMedicamento);

// Solo ADMIN y ALMACEN pueden crear y actualizar
router.post('/', verifyRole('ADMIN', 'ALMACEN'), crearMedicamento);
router.put('/:id', verifyRole('ADMIN', 'ALMACEN'), actualizarMedicamento);

// Solo ADMIN puede eliminar
router.delete('/:id', verifyRole('ADMIN'), eliminarMedicamento);

export default router;