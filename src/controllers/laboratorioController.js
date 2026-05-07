import { Laboratorio } from '../models/index.js';

// POST /api/laboratorios
export const crearLaboratorio = async (req, res) => {
    try {
        const { razonSocial, direccion, telefono, email, contacto, NrofacturaProv } = req.body;

        if (!razonSocial) {
            return res.status(400).json({ message: 'razonSocial es obligatorio.' });
        }

        const laboratorio = await Laboratorio.create({
            razonSocial, direccion, telefono, email, contacto, NrofacturaProv
        });

        res.status(201).json({ message: 'Laboratorio creado correctamente.', laboratorio });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear laboratorio.', error: error.message });
    }
};

// GET /api/laboratorios
export const listarLaboratorios = async (req, res) => {
    try {
        const laboratorios = await Laboratorio.findAll();
        res.status(200).json({ total: laboratorios.length, laboratorios });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar laboratorios.', error: error.message });
    }
};

// GET /api/laboratorios/:id
export const obtenerLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const laboratorio = await Laboratorio.findByPk(id);

        if (!laboratorio) {
            return res.status(404).json({ message: 'Laboratorio no encontrado.' });
        }

        res.status(200).json({ laboratorio });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener laboratorio.', error: error.message });
    }
};

// PUT /api/laboratorios/:id
export const actualizarLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const laboratorio = await Laboratorio.findByPk(id);

        if (!laboratorio) {
            return res.status(404).json({ message: 'Laboratorio no encontrado.' });
        }

        await laboratorio.update(req.body);
        res.status(200).json({ message: 'Laboratorio actualizado correctamente.', laboratorio });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar laboratorio.', error: error.message });
    }
};

// DELETE /api/laboratorios/:id
export const eliminarLaboratorio = async (req, res) => {
    try {
        const { id } = req.params;
        const laboratorio = await Laboratorio.findByPk(id);

        if (!laboratorio) {
            return res.status(404).json({ message: 'Laboratorio no encontrado.' });
        }

        await laboratorio.destroy();
        res.status(200).json({ message: 'Laboratorio eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar laboratorio.', error: error.message });
    }
};