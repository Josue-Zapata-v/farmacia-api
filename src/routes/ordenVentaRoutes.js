import { Router } from 'express';
import {
    crearOrdenVenta,
    listarOrdenesVenta,
    obtenerOrdenVenta,
    actualizarOrdenVenta
} from '../controllers/ordenVentaController.js';
import { verifyToken } from '../middlewares/auth.js';
import { verifyRole } from '../middlewares/roles.js';

const router = Router();

router.use(verifyToken);

// ADMIN y VENDEDOR pueden gestionar ventas
router.get('/', verifyRole('ADMIN', 'VENDEDOR'), listarOrdenesVenta);
router.get('/:id', verifyRole('ADMIN', 'VENDEDOR'), obtenerOrdenVenta);
router.post('/', verifyRole('ADMIN', 'VENDEDOR'), crearOrdenVenta);
router.put('/:id', verifyRole('ADMIN', 'VENDEDOR'), actualizarOrdenVenta);

export default router;