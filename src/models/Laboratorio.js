import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Laboratorio = sequelize.define('Laboratorio', {
    CodLab: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    razonSocial: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    contacto: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    NrofacturaProv: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'laboratorios',
    timestamps: false
});

export default Laboratorio;