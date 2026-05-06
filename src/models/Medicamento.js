import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Medicamento = sequelize.define('Medicamento', {
    CodMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcionMed: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    fechaFabricacion: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    fechaVencimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    Presentacion: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    precioVentaUni: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    precioVentaPres: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    Marca: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    CodTipoMed: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'tipo_medicamentos', key: 'CodTipoMed' }
    },
    CodEspec: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'especialidades', key: 'CodEspec' }
    }
}, {
    tableName: 'medicamentos',
    timestamps: false
});

export default Medicamento;