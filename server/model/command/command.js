
module.exports = (sequelize, DataTypes) => {
    const command = sequelize.define(
        'user',
        {
            content: {
                type: DataTypes.STRING,
                unique: true, 
                comment: '사용자가 입력한 프롬프트'
            },
            imgURL : {
                type: DataTypes.STRING,
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
    )

    command.associate = (models) => {
        command.belongsTo(models.User, {foreignKey : 'user_id'})
    }
    return user;
}