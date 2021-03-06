'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING
            },
            surname: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );
};
