const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Images = sequelize.define("Images", {
    url: DataTypes.TEXT
})




module.exports = Images;