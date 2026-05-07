import { OrdenVenta, DetalleOrdenVenta, Medicamento } from '../models/index.js';
import sequelize from '../config/database.js';

// POST /api/ventas
export const crearOrdenVenta = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { fechaEmision, Motivo, Situacion, detalles } = req.body;

        if (!fechaEmision || !detalles || detalles.length === 0) {
            await t.rollback();
            return res.status(400).json({ message: 'fechaEmision y detalles son obligatorios.' });
        }

        // Crear orden de venta
        const orden = await OrdenVenta.create({
            fechaEmision,
            Motivo: Motivo || null,
            Situacion: Situacion || 'PENDIENTE'
        }, { transaction: t });

        // Procesar cada detalle
        for (const detalle of detalles) {
            const { CodMedicamento, cantidadRequerida } = detalle;

            if (!CodMedicamento || !cantidadRequerida) {
                await t.rollback();
                return res.status(400).json({ message: 'Cada detalle requiere CodMedicamento y cantidadRequerida.' });
            }

            // Buscar medicamento y verificar stock
            const medicamento = await Medicamento.findByPk(CodMedicamento, { transaction: t });

            if (!medicamento) {
                await t.rollback();
                return res.status(404).json({ message: `Medicamento con id ${CodMedicamento} no encontrado.` });
            }

            // Validar stock disponible
            if (medicamento.stock < cantidadRequerida) {
                await t.rollback();
                return res.status(400).json({
                    message: `Stock insuficiente para "${medicamento.descripcionMed}". Stock disponible: ${medicamento.stock}, cantidad solicitada: ${cantidadRequerida}.`
                });
            }

            // Crear detalle de venta
            await DetalleOrdenVenta.create({
                NroOrdenVta: orden.NroOrdenVta,
                CodMedicamento,
                descripcionMed: medicamento.descripcionMed,
                cantidadRequerida
            }, { transaction: t });

            // Descontar stock
            await medicamento.update(
                { stock: medicamento.stock - cantidadRequerida },
                { transaction: t }
            );
        }

        await t.commit();

        // Retornar orden completa
        const ordenCompleta = await OrdenVenta.findByPk(orden.NroOrdenVta, {
            include: [{ model: DetalleOrdenVenta }]
        });

        res.status(201).json({ message: 'Orden de venta registrada correctamente.', orden: ordenCompleta });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error al registrar orden de venta.', error: error.message });
    }
};

// GET /api/ventas
export const listarOrdenesVenta = async (req, res) => {
    try {
        const ordenes = await OrdenVenta.findAll({
            include: [{ model: DetalleOrdenVenta }]
        });

        res.status(200).json({ total: ordenes.length, ordenes });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar órdenes de venta.', error: error.message });
    }
};

// GET /api/ventas/:id
export const obtenerOrdenVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const orden = await OrdenVenta.findByPk(id, {
            include: [
                {
                    model: DetalleOrdenVenta,
                    include: [{ model: Medicamento, attributes: ['descripcionMed', 'stock', 'precioVentaUni'] }]
                }
            ]
        });

        if (!orden) {
            return res.status(404).json({ message: 'Orden de venta no encontrada.' });
        }

        res.status(200).json({ orden });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener orden de venta.', error: error.message });
    }
};

// PUT /api/ventas/:id
export const actualizarOrdenVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const orden = await OrdenVenta.findByPk(id);
        if (!orden) {
            return res.status(404).json({ message: 'Orden de venta no encontrada.' });
        }

        await orden.update(req.body);
        res.status(200).json({ message: 'Orden de venta actualizada correctamente.', orden });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar orden de venta.', error: error.message });
    }
};