import { Router } from 'express';
import {
    crearTipo,
    listarTipos,
    actualizarTipo,
    eliminarTipo
} from '../controllers/tipoMedicamentoController.js';
import { verifyToken } from '../middlewares/auth.js';
import { verifyRole } from '../middlewares/roles.js';

const router = Router();

router.use(verifyToken);

router.get('/', listarTipos);
router.post('/', verifyRole('ADMIN'), crearTipo);
router.put('/:id', verifyRole('ADMIN'), actualizarTipo);
router.delete('/:id', verifyRole('ADMIN'), eliminarTipo);

export default router;