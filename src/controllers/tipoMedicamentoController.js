import { TipoMedicamento } from '../models/index.js';

// POST /api/tipos
export const crearTipo = async (req, res) => {
    try {
        const { descripcion } = req.body;

        if (!descripcion) {
            return res.status(400).json({ message: 'descripcion es obligatorio.' });
        }

        const tipo = await TipoMedicamento.create({ descripcion });
        res.status(201).json({ message: 'Tipo de medicamento creado correctamente.', tipo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tipo.', error: error.message });
    }
};

// GET /api/tipos
export const listarTipos = async (req, res) => {
    try {
        const tipos = await TipoMedicamento.findAll();
        res.status(200).json({ total: tipos.length, tipos });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar tipos.', error: error.message });
    }
};

// PUT /api/tipos/:id
export const actualizarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await TipoMedicamento.findByPk(id);

        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de medicamento no encontrado.' });
        }

        await tipo.update(req.body);
        res.status(200).json({ message: 'Tipo actualizado correctamente.', tipo });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tipo.', error: error.message });
    }
};

// DELETE /api/tipos/:id
export const eliminarTipo = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await TipoMedicamento.findByPk(id);

        if (!tipo) {
            return res.status(404).json({ message: 'Tipo de medicamento no encontrado.' });
        }

        await tipo.destroy();
        res.status(200).json({ message: 'Tipo eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tipo.', error: error.message });
    }
};