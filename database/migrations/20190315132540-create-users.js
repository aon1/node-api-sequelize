module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('user'),
};
