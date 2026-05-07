import { Router } from 'express';
import {
    crearEspecialidad,
    listarEspecialidades,
    actualizarEspecialidad,
    eliminarEspecialidad
} from '../controllers/especialidadController.js';
import { verifyToken } from '../middlewares/auth.js';
import { verifyRole } from '../middlewares/roles.js';

const router = Router();

router.use(verifyToken);

router.get('/', listarEspecialidades);
router.post('/', verifyRole('ADMIN'), crearEspecialidad);
router.put('/:id', verifyRole('ADMIN'), actualizarEspecialidad);
router.delete('/:id', verifyRole('ADMIN'), eliminarEspecialidad);

export default router;