import { Router } from 'express';
import {
    crearLaboratorio,
    listarLaboratorios,
    obtenerLaboratorio,
    actualizarLaboratorio,
    eliminarLaboratorio
} from '../controllers/laboratorioController.js';
import { verifyToken } from '../middlewares/auth.js';
import { verifyRole } from '../middlewares/roles.js';

const router = Router();

router.use(verifyToken);

router.get('/', listarLaboratorios);
router.get('/:id', obtenerLaboratorio);
router.post('/', verifyRole('ADMIN', 'ALMACEN'), crearLaboratorio);
router.put('/:id', verifyRole('ADMIN', 'ALMACEN'), actualizarLaboratorio);
router.delete('/:id', verifyRole('ADMIN'), eliminarLaboratorio);

export default router;