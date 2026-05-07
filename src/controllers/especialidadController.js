import { Especialidad } from '../models/index.js';

// POST /api/especialidades
export const crearEspecialidad = async (req, res) => {
    try {
        const { descripcionEsp } = req.body;

        if (!descripcionEsp) {
            return res.status(400).json({ message: 'descripcionEsp es obligatorio.' });
        }

        const especialidad = await Especialidad.create({ descripcionEsp });
        res.status(201).json({ message: 'Especialidad creada correctamente.', especialidad });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear especialidad.', error: error.message });
    }
};

// GET /api/especialidades
export const listarEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.findAll();
        res.status(200).json({ total: especialidades.length, especialidades });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar especialidades.', error: error.message });
    }
};

// PUT /api/especialidades/:id
export const actualizarEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const especialidad = await Especialidad.findByPk(id);

        if (!especialidad) {
            return res.status(404).json({ message: 'Especialidad no encontrada.' });
        }

        await especialidad.update(req.body);
        res.status(200).json({ message: 'Especialidad actualizada correctamente.', especialidad });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar especialidad.', error: error.message });
    }
};

// DELETE /api/especialidades/:id
export const eliminarEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const especialidad = await Especialidad.findByPk(id);

        if (!especialidad) {
            return res.status(404).json({ message: 'Especialidad no encontrada.' });
        }

        await especialidad.destroy();
        res.status(200).json({ message: 'Especialidad eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar especialidad.', error: error.message });
    }
};