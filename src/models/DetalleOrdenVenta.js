import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DetalleOrdenVenta = sequelize.define('DetalleOrdenVenta', {
    NroOrdenVta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'ordenes_venta', key: 'NroOrdenVta' }
    },
    CodMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'medicamentos', key: 'CodMedicamento' }
    },
    descripcionMed: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    cantidadRequerida: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'detalle_orden_venta',
    timestamps: false
});

export default DetalleOrdenVenta;