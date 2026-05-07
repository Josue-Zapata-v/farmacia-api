import { Router } from 'express';
import {
    crearOrdenCompra,
    listarOrdenesCompra,
    obtenerOrdenCompra
} from '../controllers/ordenCompraController.js';
import { verifyToken } from '../middlewares/auth.js';
import { verifyRole } from '../middlewares/roles.js';

const router = Router();

router.use(verifyToken);

// Solo ADMIN y ALMACEN pueden gestionar compras
router.get('/', verifyRole('ADMIN', 'ALMACEN'), listarOrdenesCompra);
router.get('/:id', verifyRole('ADMIN', 'ALMACEN'), obtenerOrdenCompra);
router.post('/', verifyRole('ADMIN', 'ALMACEN'), crearOrdenCompra);

export default router;