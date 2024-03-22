const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Command = sequelize.define(
        'command',
        {
            content: {
                type: DataTypes.STRING(255),
                unique: true, 
                comment: '사용자가 입력한 프롬프트'
            },
            imgURL : {
                type: DataTypes.STRING(255),
                unique: true, 
                allowNull : false
            }
        },
        {
            timestamps: true,
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );

    Command.associate = (models) => {
        Command.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Command;
};
