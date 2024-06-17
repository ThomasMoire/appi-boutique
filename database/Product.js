const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const  Category  = require("./Category");

const Product = sequelize.define("Product", {
    name: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT
})


Category.hasMany(Product);
Product.belongsTo(Category);



module.exports = Product;