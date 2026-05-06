import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrdenCompra = sequelize.define('OrdenCompra', {
    NroOrdenC: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaEmision: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Situacion: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    CodLab: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'laboratorios', key: 'CodLab' }
    },
    NrofacturaProv: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'ordenes_compra',
    timestamps: false
});

export default OrdenCompra;