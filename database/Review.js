const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const  User  = require("./User");
const  Product  = require("./Product");

const Review = sequelize.define("Review", {
    rating: DataTypes.INTEGER,
    content: DataTypes.TEXT
});

Product.belongsToMany(User, {through: Review});
User.belongsToMany(Product, {through: Review});


module.exports = Review;