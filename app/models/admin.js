const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    'Admin',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (admin) => {
          admin.password = admin.hashPassword(admin.password);
        },
        beforeUpdate: (admin) => {
          admin.password = admin.hashPassword(admin.password);
        },
      },
      freezeTableName: true,
      tableName: 'admin',
    },
  );

  Admin.prototype.validatePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
  };

  Admin.prototype.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();

    return bcrypt.hashSync(password, salt);
  };

  return Admin;
};
