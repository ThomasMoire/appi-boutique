const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const  Carac  = require("./Carac");
const  Product  = require("./Product");

const CaracProduct = sequelize.define("CaracProduct", {
    value: DataTypes.TEXT
})

Carac.belongsToMany(Product, { through: CaracProduct });
Product.belongsToMany(Carac, { through: CaracProduct });


module.exports = CaracProduct;