module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Brand',
    {
      name: DataTypes.STRING
    },
    {
      freezeTableName: true,
      tableName: 'brand'
    }
  )
}
