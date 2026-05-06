import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrdenVenta = sequelize.define('OrdenVenta', {
    NroOrdenVta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaEmision: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Motivo: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    Situacion: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'ordenes_venta',
    timestamps: false
});

export default OrdenVenta;