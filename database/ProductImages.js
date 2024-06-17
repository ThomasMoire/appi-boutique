const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const  Product  = require("./Product");
const Images  = require("./Images");

const ProductImages = sequelize.define("ProductImages", {

})


Product.belongsToMany(Images, { through: ProductImages });
Images.belongsToMany(Product, { through: ProductImages });


module.exports = ProductImages;