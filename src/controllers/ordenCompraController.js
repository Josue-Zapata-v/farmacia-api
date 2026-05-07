import { OrdenCompra, DetalleOrdenCompra, Medicamento, Laboratorio } from '../models/index.js';
import sequelize from '../config/database.js';

// POST /api/compras
export const crearOrdenCompra = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { fechaEmision, Situacion, CodLab, NrofacturaProv, detalles } = req.body;

        if (!fechaEmision || !CodLab || !detalles || detalles.length === 0) {
            await t.rollback();
            return res.status(400).json({ message: 'fechaEmision, CodLab y detalles son obligatorios.' });
        }

        // Verificar que el laboratorio existe
        const laboratorio = await Laboratorio.findByPk(CodLab);
        if (!laboratorio) {
            await t.rollback();
            return res.status(404).json({ message: 'Laboratorio no encontrado.' });
        }

        // Calcular total
        let total = 0;
        for (const detalle of detalles) {
            total += detalle.cantidad * detalle.precio;
        }

        // Crear orden de compra
        const orden = await OrdenCompra.create({
            fechaEmision,
            Situacion: Situacion || 'PENDIENTE',
            Total: total,
            CodLab,
            NrofacturaProv
        }, { transaction: t });

        // Crear detalles y actualizar stock
        for (const detalle of detalles) {
            const { CodMedicamento, descripcion, cantidad, precio } = detalle;

            if (!CodMedicamento || !cantidad || !precio) {
                await t.rollback();
                return res.status(400).json({ message: 'Cada detalle requiere CodMedicamento, cantidad y precio.' });
            }

            const medicamento = await Medicamento.findByPk(CodMedicamento, { transaction: t });
            if (!medicamento) {
                await t.rollback();
                return res.status(404).json({ message: `Medicamento con id ${CodMedicamento} no encontrado.` });
            }

            await DetalleOrdenCompra.create({
                NroOrdenC: orden.NroOrdenC,
                CodMedicamento,
                descripcion,
                cantidad,
                precio,
                montouni: cantidad * precio
            }, { transaction: t });

            // Actualizar stock del medicamento
            await medicamento.update(
                { stock: medicamento.stock + cantidad },
                { transaction: t }
            );
        }

        await t.commit();

        // Retornar orden con detalles
        const ordenCompleta = await OrdenCompra.findByPk(orden.NroOrdenC, {
            include: [
                { model: DetalleOrdenCompra },
                { model: Laboratorio, attributes: ['razonSocial'] }
            ]
        });

        res.status(201).json({ message: 'Orden de compra registrada correctamente.', orden: ordenCompleta });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error al registrar orden de compra.', error: error.message });
    }
};

// GET /api/compras
export const listarOrdenesCompra = async (req, res) => {
    try {
        const ordenes = await OrdenCompra.findAll({
            include: [
                { model: DetalleOrdenCompra },
                { model: Laboratorio, attributes: ['razonSocial'] }
            ]
        });

        res.status(200).json({ total: ordenes.length, ordenes });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar órdenes de compra.', error: error.message });
    }
};

// GET /api/compras/:id
export const obtenerOrdenCompra = async (req, res) => {
    try {
        const { id } = req.params;

        const orden = await OrdenCompra.findByPk(id, {
            include: [
                { model: DetalleOrdenCompra, include: [{ model: Medicamento, attributes: ['descripcionMed', 'stock'] }] },
                { model: Laboratorio, attributes: ['razonSocial', 'telefono'] }
            ]
        });

        if (!orden) {
            return res.status(404).json({ message: 'Orden de compra no encontrada.' });
        }

        res.status(200).json({ orden });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener orden de compra.', error: error.message });
    }
};