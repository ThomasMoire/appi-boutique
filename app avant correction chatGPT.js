// const { Op } = require("sequelize");
// const sequelize = require("./database");
// const { Category } = require("./database");
// const { Product } = require("./database");
// const { Carac } = require("./database");
// const { Images } = require("./database");
// const { Review } = require("./database");
// const { User } = require("./database");
// const { Cart } = require("./database");
// const { Role } = require("./database");
// const { CaracProduct } = require("./database");
// const { ProductImages } = require("./database");
// const { ProductCart } = require("./database");

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const secret = 'my-secret-key-of-the-dead';
// const bcrypt = require('bcrypt');
// const cookieParser = require("cookie-parser");
// const saltRounds = 10;
// app.use(cookieParser());
// app.use(express.json());
// app.use(cors());
// function checkJwt(req,res,next){
    
//     const token = req.cookies.token; // Lire les cookies plutôt que le body.


//     jwt.verify(token,secret,(err,decodedToken)=>{
//         if(err){
//             res.status(401).json("Unauthorized, wrng token");
//             return;
//         }
//         switch (decodedToken.role){
//             case "admin":
//                 next();
//                 break;

//             case "guest":
//             default:
//                 res.status(401).json({msg:"Unauthorized role"});
//                 break;
//         }
//     })
// }

// // ROUTES DE PRODUIT :

// app.get("/product/:id", async (req, res) => {
//     const product = await Product.findByPk(req.params.id)
//         .catch((error) => res.status(500).json("Erreur 500"));
//     if (product) {
//         res.status(200).json(product);
//     } else {
//         res.status(404).json({ message: "Aucun Produit trouvé avec cet id." });
//     }
// });

// /* app.get("/products/search/:text", async (req, res) => {
//     const text = req.params.text.toLowerCase();
//     try {
//         const products = await Product.findAll();
//         const searchedProducts = products.filter(product => product.name.toLowerCase().includes(text) || product.description.toLowerCase().includes(text));

//         if (searchedProducts.length > 0) {
//             res.status(200).json(searchedProducts);
//         } else {
//             res.status(404).json({ message: "Aucun Produit trouvé avec cette entrée." });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// }) */

// app.get("/products/search/:text", async (req, res) => {
//     const text = req.params.text.toLowerCase();
//     try {
//         // doc sequelize : op like
//         const products = await Product.findAll({
//             where: {
//                 [Op.or]: [
//                     {
//                         name: {
//                             [Op.like]: `%${text}%`
//                         }
//                     }
//                     ,
//                     {
//                         description: {
//                             [Op.like]: `%${text}%`
//                         }
//                     }
//                 ]
//             }
//         });

//         products.length > 0 ? res.status(200).json(products) : res.status(404).json({ message: "Aucun Produit trouvé avec cette entrée." });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// });


// // refaire avec sequelize "limit" :
// /* app.get("/products/:limit", async (req, res) => {
//     const limit = req.params.limit;
//     try {
//         const products = await Product.findAll({
//             where: {
//                 id: {
//                     [Op.lte]: limit
//                 }
//             }
//         })
//         if (products) {
//             res.status(200).json(products);
//         } else {
//             res.status(400).json({ message: "Erreur lors de la recherche des produits" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// }) */

// app.get("/products/:limit", async (req, res) => {

//     const limit = parseInt(req.params.limit, 10);

//     if (isNaN(limit)) {
//         res.status(400).json({ message: "'limit' doit être un nombre." });
//     }

//     try {
//         const products = await Product.findAll({ limit: limit })

//         products.length > 0 ? res.status(200).json(products) : res.status(404).json({ message: "Aucun produit trouvé" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// });

// app.get("/products", async (req, res) => {

//     try {
//         const products = await Product.findAll()

//         products.length > 0 ? res.status(200).json(products) : res.status(404).json({ message: "Aucun produit" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// });



// app.get("/products/category/:categoryId", async (req, res) => {
//     try {
//         const products = await Product.findAll({
//             where: {
//                 CategoryId: req.params.categoryId
//             }
//         })
//         if (products) {
//             res.status(200).json(products);
//         } else {
//             res.status(400).json({ message: "Erreur lors de la recherche des produits" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// })

// app.post("/product", checkJwt, async (req, res) => {
//     const newProduct = req.body;
//     const product = {
//         name: newProduct.name,
//         price: newProduct.price,
//         description: newProduct.description,
//         CategoryId: newProduct.categoryId
//     };
//     const category = await Category.findByPk(newProduct.categoryId)
//     if (category) { 
//         await Product.create(product)
//         res.status(200).json(product.name + " a été ajouté à la liste des produits"); 
//     }
//     else { res.status(400).json("catégorie inexistante") }
// })
// function checkJwt(req,res,next){
//     const token = req.body.jwt;
//     jwt.verify(token,secret,(err,decodedToken)=>{
//         if(err){
//             res.status(401).json("Unauthorized, wrong token");
//             return;
//         }
//         switch (decodedToken.role){
//             case "admin":
//                 next();
//                 break;

//             case "guest":
//             default:
//                 res.status(401).json("Unauthorized role");
//                 break;
//         }
//     })
// }

// app.delete("/product/:id", async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id);
//         const productDestroyed = product.dataValues;
//         await product.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         product ? res.status(200).json({ message: "Produit supprimé : ", data: productDestroyed }) : res.status(400).json({ message: "Erreur lors de la suppression" });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur 500" });
//     }
// });

// app.put("/product", async (req, res) => {
//     try {
//         const modifiedProduct = req.body;

//         await Product.update(modifiedProduct, {
//             where: {
//                 id: modifiedProduct.id
//             }
//         });

//         // Recharger les données du Produit mis à jour depuis la base de données
//         const updatedProduct = await Product.findByPk(modifiedProduct.id);

//         modifiedProduct ? res.status(200).json(updatedProduct) : res.status(400).json({ message: "Erreur lors de la modification" });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la modification du Produit." });
//     }
// });

// app.post("/product/review", async (req, res) => {
//     const newReview = req.body;
//     const product = await Product.findByPk(newReview.productId);
//     const user = await User.findByPk(newReview.userId);
//     const review = await Review.create({
//         rating: newReview.rating,
//         content: newReview.content,
//         UserId: user.id,
//         ProductId: product.id
//     });
//     res.status(200).json({ message: "La review a bien été ajoutée", data: review });
// });


// app.put("/product/review", async (req, res) => {
//     try {
//         const modifiedReview = req.body;
//         const product = await Product.findByPk(modifiedReview.productId);
//         const user = await User.findByPk(modifiedReview.userId);
//         await Review.update({
//             rating: modifiedReview.rating,
//             content: modifiedReview.content
//         }, {
//             where: {
//                 [Op.and]: {
//                     UserId: user.id,
//                     ProductId: product.id
//                 }
//             }
//         });
//         const updatedReview = await Review.findOne({
//             where: {
//                 [Op.and]: {
//                     UserId: user.id,
//                     ProductId: product.id
//                 }
//             }
//         });
//         updatedReview != undefined ? res.status(200).json(updatedReview) : res.status(400).json({ message: "Erreur lors de la modification" });

//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur500");
//     }
// });

// app.get("/product/reviews/:productId", async (req, res) => {
//     try {
//         const reviews = await Review.findAll({
//             where: {
//                 ProductId: req.params.productId
//             }
//         })
//         reviews != undefined ? res.status(200).json(reviews) : res.status(400).json({ message: "Erreur 400" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// app.delete("/product/reviews/:productId", async (req, res) => {
//     try {
//         const reviews = await Review.findAll({
//             where: {
//                 ProductId: req.params.productId
//             }
//         })
//         const reviewsDestroyed = reviews.dataValues;

//         await Review.destroy({
//             where: {
//                 ProductId: req.params.productId
//             }
//         })
//         reviews != undefined ? res.status(200).json({ message: "review(s) supprimée(s)", data: reviewsDestroyed }) : res.status(400).json({ message: "Erreur 400" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// // ROUTES DE CATEGORIES DE PRODUIT :


// app.get("/categories", async (req, res) => {
//     try {
//         const categories = await Category.findAll();
//         categories != undefined ? res.status(200).json(categories) : res.status(400).json({ message: "Erreur 400" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// })

// app.get("/category/:id", async (req, res) => {
//     try {
//         const category = await Category.findByPk(req.params.id);
//         category != undefined ? res.status(200).json(category) : res.status(400).json({ message: "Erreur 400" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("Erreur 500");
//     }
// });

// app.post("/category", async (req, res) => {
//     const newCategory = req.body;
//     const category = await Category.create({
//         title: newCategory.title
//     });
//     res.status(200).json(category.title + " a été ajouté à la liste des catégories");
// });

// app.delete("/category/:id", async (req, res) => {
//     try {
//         const category = await Category.findByPk(req.params.id);
//         const categoryDestroyed = category.dataValues;
//         await category.destroy();
//         category != undefined ? res.status(200).json({ message: "catégorie supprimée", data: categoryDestroyed }) : res.status(400).json({ message: "Erreur 400" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// app.put("/category", async (req, res) => {
//     try {
//         const modifiedCategory = req.body;

//         await Category.update(modifiedCategory, {
//             where: {
//                 id: modifiedCategory.id
//             }
//         });

//         // Recharger les données de la Catégorie mise à jour depuis la base de données
//         const updatedCategory = await Category.findByPk(modifiedCategory.id);

//         updatedCategory != undefined ? res.status(200).json(updatedCategory) : res.status(400).json({ message: "Erreur lors de la modification" });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur 500" });
//     }
// });

// // ROUTES DES UTILISATEURS :

// app.post("/login", async (req, res) => {
//     try {
//         const user = req.body;
//         const userToCompare = await User.findOne({
//             where: {
//                 email: user.email
//             }
//         });
//         if (userToCompare) {
//             await bcrypt.compare(user.password, userToCompare.password) ? res.status(200).json("OK") : res.status(400).json("mdp  ");
//         } else { res.status(400).json("pas de concordance des adresses mail dans la bdd") };
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
//     const payload = {
//         name : "Thomas",
//         role : "admin"
// };  
//     const newToken = jwt.sign(payload, secret);
//     res.cookie("token",newToken,{httpOnly:true});
//     return res.json({jwt : newToken});
// });

// app.post("/user/login", async (req, res) => {
//     try {
//         const user = req.body;
//         const userToCompare = await User.findOne({
//             where: {
//                 email: user.email
//             }
//         });
//         if (userToCompare) {
//             await bcrypt.compare(user.password, userToCompare.password) ? res.status(200).json("OK") : res.status(400).json("mdp différents");
//         } else { res.status(400).json("pas de concordance des adresses mail dans la bdd") };
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// app.post("/user/signup", async (req, res) => {
//     try {
//         const newUser = req.body;
//         const user = await User.create({
//             name: newUser.name,
//             password: newUser.password,
//             email: newUser.email,
//             birth_date: newUser.birth_date
//         });
//         user ? res.status(200).json(user.name + " ajouté avec succès") : res.status(400).json("erreur saisie");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// app.put("/user", async (req, res) => {
//     try {
//         const modifiedUser = req.body;

//         await User.update(modifiedUser, {
//             where: {
//                 id: modifiedUser.id
//             }
//         });

//         // Recharger les données de la Catégorie mise à jour depuis la base de données
//         const updatedUser = await User.findByPk(modifiedUser.id);

//         updatedUser != undefined ? res.status(200).json(updatedUser) : res.status(400).json({ message: "Erreur lors de la modification" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Erreur 500" });
//     }
// });

// app.get("/user/:id", async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.id);
//         user ? res.status(200).json(user) : res.status(400).json("Aucun utilisateur trouvé avec cet id");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// app.get("/users", async (req, res) => {
//     try {
//         const users = await User.findAll();
//         users.length > 0 ? res.status(200).json(users) : res.status(400).json("Aucun utilisateur existant");
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// // ROUTES POUR LE PANIER :

// app.get("/cart/:userid", async (req, res) => {
//     try {
//         const user = await User.findByPk(req.params.userid);
//         const cart = await user.getCart();
//         const products = await cart.getProducts();
//         res.status(200).json(products);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json("erreur 500");
//     }
// });

// /* app.post("/cart/:userid/:productid/:quantity", async (req, res) => {
//     const user = await User.findByPk(req.params.userid);
//     const cart = await user.getCart();
//     const product = await Product.findByPk(req.params.productid);
//     let cartProduct = await cart.addProduct(product);
//     cartProduct = cartProduct.shift();
//     cartProduct.quantity = req.params.quantity;
//     cartProduct.save();

//     const productToSend = {
//         ...product.dataValues,
//         quantity: productCart.quantity
//     };
//     res.status(200).json(productToSend);

// }) */

// app.post("/cart/:userid/:productid/:quantity", async (req, res) => {
//     const user = await User.findByPk(req.params.userid);
//     const cart = await user.getCart();
//     const product = await Product.findByPk(req.params.productid);
//     await cart.addProduct(product);

//     const productCart = await ProductCart.findOne({
//         where: {
//             [Op.and]: {
//                 ProductId: product.id,
//                 CartId: cart.id
//             }
//         }
//     });

//     productCart.quantity = req.params.quantity;
//     await productCart.save();
//     const productToSend = {
//         ...product.dataValues,
//         quantity: productCart.quantity
//     };
//     res.status(200).json(productToSend);
// });

// /**
//  * Une route qui permet de modifier la quantité d'un produit dans le panier d'un utilisateur spécifié
//  */
// app.put("/cart/:userid/:productid/:quantity", async (req, res) => {
//     const user = await User.findByPk(req.params.userid);
//     const cart = await user.getCart();
//     const product = await Product.findByPk(req.params.productid);
//     await ProductCart.update({ quantity: req.params.quantity }, {
//         where: {
//             [Op.and]: {
//                 CartId: cart.id,
//                 ProductId: req.params.productid
//             }
//         }
//     })
//     res.status(200).json("quantité modifiée");
// })

// app.listen(8066, () => {
//     console.log("Youhouuuuu serveur lancé sur localhost:8066");
// });