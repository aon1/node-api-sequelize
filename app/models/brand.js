module.exports = (sequelize, DataTypes) => sequelize.define(
  'Brand',
  {
    name: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    tableName: 'brand',
  },
);
