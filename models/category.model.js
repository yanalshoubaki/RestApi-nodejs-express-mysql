module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      category_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: Sequelize.STRING,
      },
      category_slug: {
        type: Sequelize.STRING,
      },
      category_active: {
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
      tableName: "tbl_category",
      timestamps: false,
    }
  );
  Category.associate = (models) => {
    Category.hasMany(models.Post, {
      as: "post",
      foreignKey: "category_id",
    });
  };
  return Category;
};
