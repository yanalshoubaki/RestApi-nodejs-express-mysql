module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "Post",
    {
      post_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      post_author: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        references: {
          model: "user",
          key: "ID",
        },
      },
      category_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        references: {
          model: "category",
          key: "category_id",
        },
      },
      post_title: {
        type: Sequelize.STRING,
      },
      post_content: {
        type: Sequelize.STRING,
      },
      post_slug: {
        type: Sequelize.STRING,
      },
      post_image: {
        type: Sequelize.STRING,
      },
      post_status: {
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
      tableName: "tbl_posts",
      timestamps: false,
    }
  );
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      as: "user",

      foreignKey: "post_author",
    });
    Post.belongsTo(models.Category, {
      as: "category",

      foreignKey: "category_id",
    });
  };
  return Post;
};
