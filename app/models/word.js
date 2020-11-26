module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define(
    "Word",
    {
      word: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "words"
    }
  );

  return Word;
};
