const { Sequelize, DataTypes, Op } = require("sequelize");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = {
    database: "boutique",
    username: "boutique",
    password: "boutique"
};

// Connexion à la BDD
const sequelize = new Sequelize(login.database, login.username, login.password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
    logging: false
});

// Vérifier la connexion
sequelize.authenticate()
    .then(() => console.log("Connexion à la base de données boutique"))
    .catch(error => console.log(error));





module.exports = sequelize;
module.exports.Product = require("./Product");
module.exports.Carac = require("./Carac");
module.exports.Images = require("./Images");
module.exports.Category = require("./Category");
module.exports.Review = require("./Review");
module.exports.User = require("./User");
module.exports.Cart = require("./Cart");
module.exports.Role = require("./Role");
module.exports.CaracProduct = require("./CaracProduct");
module.exports.ProductImages = require("./ProductImages");
module.exports.ProductCart = require("./ProductCart");

// Application des changements à MySQL en peuplant la BDD
sequelize.sync({ force: true })
    .then(async () => {
        console.log("Les modèles et les tables sont synchronisés.")
        const Product = sequelize.models.Product;
        const Category = sequelize.models.Category;
        const User = sequelize.models.User;
        const Cart = sequelize.models.Cart;
        const produits = await Product.bulkCreate([
            {
                name: "Converse rouge",
                price: 20,
                description: "Magnifique paire de Converse ayant été portées par le célèbre Massinissa"
            },
            {
                name: "Adidas du bled",
                price: 10,
                description: "Sisi c'est des vraies tkt"
            }
        ])
        const chaussures = await Category.create({
            title: "Chaussures"
        })

        await produits[0].setCategory(chaussures);
        await produits[1].setCategory(chaussures);

        const jerem = await User.create({
            name: "Jerem",
            password: "Ricard4ever",
            email: "jerem@jerem",
            birth_date: new Date(1993, 1, 22)
        })

        const cart = await Cart.create({
            UserId: jerem.id
        })
    })