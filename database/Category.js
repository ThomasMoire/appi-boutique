const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Category = sequelize.define("Category", {
    title: DataTypes.STRING,
})

module.exports = Category;