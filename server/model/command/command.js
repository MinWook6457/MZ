module.exports = (sequelize, DataTypes) => {
    const Command = sequelize.define(
        'command',
        {
            id: { // 기본키
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                comment: 'commandId',
            },
            content: {
                type: DataTypes.STRING(255),
                unique: true, 
                comment: '사용자가 입력한 프롬프트'
            },
            imgURL : {
                type: DataTypes.STRING(1000),
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
        Command.belongsTo(models.User, { foreignKey: 'user_id' }); // 외래키 설정
    };

    return Command;
};
