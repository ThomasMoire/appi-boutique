const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Role = require("./Role");
const Cart = require("./Cart");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = sequelize.define("User", {
    name: DataTypes.TEXT,
    password: {
        type: DataTypes.STRING,
        set(value) {
            const hash = bcrypt.hashSync(value, saltRounds);
            this.setDataValue("password", hash)
        },
    },
    email: DataTypes.TEXT,
    birth_date: DataTypes.DATEONLY
});


Role.hasMany(User);
User.belongsTo(Role);

// Cart get a foreign key of User
Cart.belongsTo(User, {
    foreignKey: {
        unique: true
    }
});
User.hasOne(Cart);


module.exports = User;