import sequelize from '../config/database.js';

import Usuario from './Usuario.js';
import Especialidad from './Especialidad.js';
import TipoMedicamento from './TipoMedicamento.js';
import Medicamento from './Medicamento.js';
import Laboratorio from './Laboratorio.js';
import OrdenCompra from './OrdenCompra.js';
import DetalleOrdenCompra from './DetalleOrdenCompra.js';
import OrdenVenta from './OrdenVenta.js';
import DetalleOrdenVenta from './DetalleOrdenVenta.js';

// Medicamento pertenece a TipoMedicamento y Especialidad
Medicamento.belongsTo(TipoMedicamento, { foreignKey: 'CodTipoMed' });
Medicamento.belongsTo(Especialidad, { foreignKey: 'CodEspec' });
TipoMedicamento.hasMany(Medicamento, { foreignKey: 'CodTipoMed' });
Especialidad.hasMany(Medicamento, { foreignKey: 'CodEspec' });

// OrdenCompra pertenece a Laboratorio
OrdenCompra.belongsTo(Laboratorio, { foreignKey: 'CodLab' });
Laboratorio.hasMany(OrdenCompra, { foreignKey: 'CodLab' });

// DetalleOrdenCompra pertenece a OrdenCompra y Medicamento
DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'NroOrdenC' });
DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });
OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: 'NroOrdenC' });
Medicamento.hasMany(DetalleOrdenCompra, { foreignKey: 'CodMedicamento' });

// DetalleOrdenVenta pertenece a OrdenVenta y Medicamento
DetalleOrdenVenta.belongsTo(OrdenVenta, { foreignKey: 'NroOrdenVta' });
DetalleOrdenVenta.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });
OrdenVenta.hasMany(DetalleOrdenVenta, { foreignKey: 'NroOrdenVta' });
Medicamento.hasMany(DetalleOrdenVenta, { foreignKey: 'CodMedicamento' });

export {
    sequelize,
    Usuario,
    Especialidad,
    TipoMedicamento,
    Medicamento,
    Laboratorio,
    OrdenCompra,
    DetalleOrdenCompra,
    OrdenVenta,
    DetalleOrdenVenta
};