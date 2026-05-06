import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DetalleOrdenCompra = sequelize.define('DetalleOrdenCompra', {
    NroOrdenC: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'ordenes_compra', key: 'NroOrdenC' }
    },
    CodMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: 'medicamentos', key: 'CodMedicamento' }
    },
    descripcion: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    montouni: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'detalle_orden_compra',
    timestamps: false
});

export default DetalleOrdenCompra;