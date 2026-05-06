import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TipoMedicamento = sequelize.define('TipoMedicamento', {
    CodTipoMed: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'tipo_medicamentos',
    timestamps: false
});

export default TipoMedicamento;