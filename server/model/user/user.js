
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            id: { // 기본키
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                comment: 'userId',
            },
            email: {
                type: DataTypes.STRING(255),
                unique: true, // 널 값 허용 , 값 중복 허용X
                comment: '로그인 인증 이메일'
            },
            password : { // 비밀번호
                type: DataTypes.STRING(255),
                allowNull: false
            },

        },
        {
            timestamps: true,
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    )

    user.associate = (models) => {
        user.hasMany(models.Command, { foreignKey: 'user_id'})
        // user.hasMany(models.RefreshToken, {foreignKey : 'user_id'})
    }
    return user;
}