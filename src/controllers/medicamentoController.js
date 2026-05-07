import { Medicamento, TipoMedicamento, Especialidad } from '../models/index.js';

// POST /api/medicamentos
export const crearMedicamento = async (req, res) => {
    try {
        const {
            descripcionMed, fechaFabricacion, fechaVencimiento,
            Presentacion, stock, precioVentaUni, precioVentaPres,
            Marca, CodTipoMed, CodEspec
        } = req.body;

        if (!descripcionMed || !precioVentaUni) {
            return res.status(400).json({ message: 'descripcionMed y precioVentaUni son obligatorios.' });
        }

        const medicamento = await Medicamento.create({
            descripcionMed, fechaFabricacion, fechaVencimiento,
            Presentacion, stock: stock || 0, precioVentaUni,
            precioVentaPres, Marca, CodTipoMed, CodEspec
        });

        res.status(201).json({ message: 'Medicamento creado correctamente.', medicamento });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear medicamento.', error: error.message });
    }
};

// GET /api/medicamentos
export const listarMedicamentos = async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll({
            include: [
                { model: TipoMedicamento, attributes: ['descripcion'] },
                { model: Especialidad, attributes: ['descripcionEsp'] }
            ]
        });

        res.status(200).json({ total: medicamentos.length, medicamentos });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar medicamentos.', error: error.message });
    }
};

// GET /api/medicamentos/:id
export const obtenerMedicamento = async (req, res) => {
    try {
        const { id } = req.params;

        const medicamento = await Medicamento.findByPk(id, {
            include: [
                { model: TipoMedicamento, attributes: ['descripcion'] },
                { model: Especialidad, attributes: ['descripcionEsp'] }
            ]
        });

        if (!medicamento) {
            return res.status(404).json({ message: 'Medicamento no encontrado.' });
        }

        res.status(200).json({ medicamento });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener medicamento.', error: error.message });
    }
};

// PUT /api/medicamentos/:id
export const actualizarMedicamento = async (req, res) => {
    try {
        const { id } = req.params;

        const medicamento = await Medicamento.findByPk(id);
        if (!medicamento) {
            return res.status(404).json({ message: 'Medicamento no encontrado.' });
        }

        await medicamento.update(req.body);

        res.status(200).json({ message: 'Medicamento actualizado correctamente.', medicamento });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar medicamento.', error: error.message });
    }
};

// DELETE /api/medicamentos/:id
export const eliminarMedicamento = async (req, res) => {
    try {
        const { id } = req.params;

        const medicamento = await Medicamento.findByPk(id);
        if (!medicamento) {
            return res.status(404).json({ message: 'Medicamento no encontrado.' });
        }

        await medicamento.destroy();

        res.status(200).json({ message: 'Medicamento eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar medicamento.', error: error.message });
    }
};