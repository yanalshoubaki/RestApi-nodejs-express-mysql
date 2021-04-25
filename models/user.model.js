module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      user_email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      user_role: {
        type: Sequelize.INTEGER,
      },
      user_status: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "tbl_users",
      timestamps: false,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Post, {
      as: "post",

      foreignKey: "post_author",
    });
  };
  return User;
};
