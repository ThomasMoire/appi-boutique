// const { Op } = require("sequelize");
// const sequelize = require("./database");
// const { Category, Product, Carac, Images, Review, User, Cart, Role, CaracProduct, ProductImages, ProductCart } = require("./database");

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

// const secretKey = "my-secret-key";
// const payload = {
//     name: "Thomas",
//     role: "admin",
//     exp : Math.floor(Date.now() / 1000) + (60 * 60)  // Expiratation dans 1h
// };

// const token = jwt.sign(payload, secretKey,{
//     algorithm: "HS256"});

// console.log(token);


// function checkJwt(req, res, next) {
//     const token = req.cookies.token; // Lire les cookies plutôt que le body.
//     if (!token) {
//         return res.status(401).json("Unauthorized, no token provided");
//     }

//     jwt.verify(token, secret, (err, decodedToken) => {
//         if (err) {
//             res.status(401).json("Unauthorized, wrong token");
//             return;
//         }
//         req.user = decodedToken;
//         next();
//     });
// }





// // ROUTES DE PRODUIT :

// app.get("/product/:id", async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id);
//         if (product) {
//             res.status(200).json(product);
//         } else {
//             res.status(404).json({ message: "Aucun Produit trouvé avec cet id." });
//         }
//     } catch (error) {
//         res.status(500).json("Erreur 500");
//     }
// });

// app.get("/products/search/:text", async (req, res) => {
//     const text = req.params.text.toLowerCase();
//     try {
//         const products = await Product.findAll({
//             where: {
//                 [Op.or]: [
//                     { name: { [Op.like]: `%${text}%` } },
//                     { description: { [Op.like]: `%${text}%` } }
//                 ]
//             }
//         });

//         if (products.length > 0) {
//             res.status(200).json(products);
//         } else {
//             res.status(404).json({ message: "Aucun Produit trouvé avec cette entrée." });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// });

// app.get("/products/:limit", async (req, res) => {
//     const limit = parseInt(req.params.limit, 10);

//     if (isNaN(limit)) {
//         return res.status(400).json({ message: "'limit' doit être un nombre." });
//     }

//     try {
//         const products = await Product.findAll({ limit });
//         if (products.length > 0) {
//             res.status(200).json(products);
//         } else {
//             res.status(404).json({ message: "Aucun produit trouvé" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// });

// app.get("/products", async (req, res) => {
//     try {
//         const products = await Product.findAll();
//         if (products.length > 0) {
//             res.status(200).json(products);
//         } else {
//             res.status(404).json({ message: "Aucun produit" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// });

// app.get("/products/category/:categoryId", async (req, res) => {
//     try {
//         const products = await Product.findAll({
//             where: { CategoryId: req.params.categoryId }
//         });
//         if (products.length > 0) {
//             res.status(200).json(products);
//         } else {
//             res.status(404).json({ message: "Aucun produit trouvé pour cette catégorie." });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
//     }
// });

// app.post("/product", checkJwt, async (req, res) => {
//     const newProduct = req.body;
//     const product = {
//         name: newProduct.name,
//         price: newProduct.price,
//         description: newProduct.description,
//         CategoryId: newProduct.categoryId
//     };
//     try {
//         const category = await Category.findByPk(newProduct.categoryId);
//         if (category) {
//             await Product.create(product);
//             res.status(200).json(product.name + " a été ajouté à la liste des produits");
//         } else {
//             res.status(400).json("catégorie inexistante");
//         }
//     } catch (error) {
//         res.status(500).json("Erreur lors de l'ajout du produit.");
//     }
// });

// app.delete("/product/:id", checkJwt, async (req, res) => {
//     try {
//         const product = await Product.findByPk(req.params.id);
//         if (product) {
//             const productDestroyed = product.dataValues;
//             await product.destroy();
//             res.status(200).json({ message: "Produit supprimé", data: productDestroyed });
//         } else {
//             res.status(404).json({ message: "Produit non trouvé" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur 500" });
//     }
// });

// app.put("/product", checkJwt, async (req, res) => {
//     try {
//         const modifiedProduct = req.body;
//         await Product.update(modifiedProduct, {
//             where: { id: modifiedProduct.id }
//         });

//         const updatedProduct = await Product.findByPk(modifiedProduct.id);
//         if (updatedProduct) {
//             res.status(200).json(updatedProduct);
//         } else {
//             res.status(400).json({ message: "Erreur lors de la modification" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la modification du Produit." });
//     }
// });

// app.post("/product/review", async (req, res) => {
//     try {
//         const newReview = req.body;
//         const product = await Product.findByPk(newReview.productId);
//         const user = await User.findByPk(newReview.userId);
//         if (product && user) {
//             const review = await Review.create({
//                 rating: newReview.rating,
//                 content: newReview.content,
//                 UserId: user.id,
//                 ProductId: product.id
//             });
//             res.status(200).json({ message: "La review a bien été ajoutée", data: review });
//         } else {
//             res.status(400).json({ message: "Produit ou utilisateur non trouvé" });
//         }
//     } catch (error) {
//         res.status(500).json("Erreur lors de l'ajout de la review.");
//     }
// });

// app.put("/product/review", async (req, res) => {
//     try {
//         const modifiedReview = req.body;
//         const product = await Product.findByPk(modifiedReview.productId);
//         const user = await User.findByPk(modifiedReview.userId);
//         if (product && user) {
//             await Review.update({
//                 rating: modifiedReview.rating,
//                 content: modifiedReview.content
//             }, {
//                 where: {
//                     [Op.and]: {
//                         UserId: user.id,
//                         ProductId: product.id
//                     }
//                 }
//             });

//             const updatedReview = await Review.findOne({
//                 where: {
//                     [Op.and]: {
//                         UserId: user.id,
//                         ProductId: product.id
//                     }
//                 }
//             });
//             if (updatedReview) {
//                 res.status(200).json(updatedReview);
//             } else {
//                 res.status(400).json({ message: "Erreur lors de la modification" });
//             }
//         } else {
//             res.status(400).json({ message: "Produit ou utilisateur non trouvé" });
//         }
//     } catch (error) {
//         res.status(500).json("Erreur 500");
//     }
// });

// app.get("/product/reviews/:productId", async (req, res) => {
//     try {
//         const reviews = await Review.findAll({
//             where: { ProductId: req.params.productId }
//         });
//         if (reviews.length > 0) {
//             res.status(200).json(reviews);
//         } else {
//             res.status(404).json({ message: "Aucune review trouvée pour ce produit." });
//         }
//     } catch (error) {
//         res.status(500).json("Erreur 500");
//     }
// });

// app.delete("/product/reviews/:productId", async (req, res) => {
//     try {
//         const reviews = await Review.findAll({
//             where: { ProductId: req.params.productId }
//         });
//         if (reviews.length > 0) {
//             const reviewsDestroyed = reviews.map(review => review.dataValues);
//             await Review.destroy({
//                 where: { ProductId: req.params.productId }
//             });
//             res.status(200).json({ message: "Reviews supprimées", data: reviewsDestroyed });
//         } else {
//             res.status(404).json({ message: "Aucune review trouvée pour ce produit" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur 500" });
//     }
// });

// // ROUTES DES CATÉGORIES :

// app.get("/categories", async (req, res) => {
//     try {
//         const categories = await Category.findAll();
//         if (categories.length > 0) {
//             res.status(200).json(categories);
//         } else {
//             res.status(404).json({ message: "Aucune catégorie" });
//         }
//     } catch (error) {
//         res.status(500).json("Erreur lors de la recherche des Catégories.");
//     }
// });

// app.post("/category", checkJwt, async (req, res) => {
//     const newCategory = req.body;
//     try {
//         const existingCategory = await Category.findOne({ where: { name: newCategory.name } });
//         if (!existingCategory) {
//             await Category.create(newCategory);
//             res.status(200).json(newCategory.name + " a été ajouté à la liste des catégories");
//         } else {
//             res.status(400).json("Nom de catégorie existant");
//         }
//     } catch (error) {
//         res.status(500).json("Erreur lors de l'ajout de la catégorie.");
//     }
// });

// app.delete("/category/:id", checkJwt, async (req, res) => {
//     try {
//         const category = await Category.findByPk(req.params.id);
//         if (category) {
//             const categoryDestroyed = category.dataValues;
//             await category.destroy();
//             res.status(200).json({ message: "Catégorie supprimée", data: categoryDestroyed });
//         } else {
//             res.status(404).json({ message: "Catégorie non trouvée" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Erreur 500" });
//     }
// });

// app.put("/category", checkJwt, async (req, res) => {
//     try {
//         const modifiedCategory = req.body;
//         await Category.update(modifiedCategory, {
//             where: { id: modifiedCategory.id }
//         });

//         const updatedCategory = await Category.findByPk(modifiedCategory.id);
//         if (updatedCategory) {
//             res.status(200).json(updatedCategory);
//         } else {
//             res.status(400).json({ message: "Erreur lors de la modification" });
//         }
//     } catch (error) {
//         res.status(500).json("Erreur 500");
//     }
// });

// // Routes de gestion d'utilisateurs, panier, images, caractéristiques, etc. à suivre...

// app.listen(8066, () => {
//     console.log("Server is running on port 8066");
// });


const { Op } = require("sequelize");
const sequelize = require("./database");
const { Category, Product, Carac, Images, Review, User, Cart, Role, CaracProduct, ProductImages, ProductCart } = require("./database");

const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret = 'my-secret-key-of-the-dead';
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const saltRounds = 10;
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const secretKey = "my-secret-key";

function checkJwt(req, res, next) {
    const token = req.cookies.token; // Lire les cookies plutôt que le body.
    if (!token) {
        return res.status(401).json("Unauthorized, no token provided");
    }

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            res.status(401).json("Unauthorized, wrong token");
            return;
        }
        req.user = decodedToken;
        next();
    });
}

// Route de login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Chercher l'utilisateur dans la base de données
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Créer le token JWT
        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        // Envoyer le token dans un cookie
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during login" });
    }
});

// ROUTES DE PRODUIT :

app.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Aucun Produit trouvé avec cet id." });
        }
    } catch (error) {
        res.status(500).json("Erreur 500");
    }
});

app.get("/products/search/:text", async (req, res) => {
    const text = req.params.text.toLowerCase();
    try {
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${text}%` } },
                    { description: { [Op.like]: `%${text}%` } }
                ]
            }
        });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: "Aucun Produit trouvé avec cette entrée." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
    }
});

app.get("/products/:limit", async (req, res) => {
    const limit = parseInt(req.params.limit, 10);

    if (isNaN(limit)) {
        return res.status(400).json({ message: "'limit' doit être un nombre." });
    }

    try {
        const products = await Product.findAll({ limit });
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: "Aucun produit trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
    }
});

app.get("/products", async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: "Aucun produit" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
    }
});

app.get("/products/category/:categoryId", async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { CategoryId: req.params.categoryId }
        });
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: "Aucun produit trouvé pour cette catégorie." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche des Produits." });
    }
});

app.post("/product", checkJwt, async (req, res) => {
    const newProduct = req.body;
    const product = {
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        CategoryId: newProduct.categoryId
    };
    try {
        const category = await Category.findByPk(newProduct.categoryId);
        if (category) {
            await Product.create(product);
            res.status(200).json(product.name + " a été ajouté à la liste des produits");
        } else {
            res.status(400).json("catégorie inexistante");
        }
    } catch (error) {
        res.status(500).json("Erreur lors de l'ajout du produit.");
    }
});

app.delete("/product/:id", checkJwt, async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            const productDestroyed = product.dataValues;
            await product.destroy();
            res.status(200).json({ message: "Produit supprimé", data: productDestroyed });
        } else {
            res.status(404).json({ message: "Produit non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur 500" });
    }
});

app.put("/product", checkJwt, async (req, res) => {
    try {
        const modifiedProduct = req.body;
        await Product.update(modifiedProduct, {
            where: { id: modifiedProduct.id }
        });

        const updatedProduct = await Product.findByPk(modifiedProduct.id);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(400).json({ message: "Erreur lors de la modification" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la modification du Produit." });
    }
});

app.post("/product/review", async (req, res) => {
    try {
        const newReview = req.body;
        const product = await Product.findByPk(newReview.productId);
        const user = await User.findByPk(newReview.userId);
        if (product && user) {
            const review = await Review.create({
                rating: newReview.rating,
                content: newReview.content,
                UserId: user.id,
                ProductId: product.id
            });
            res.status(200).json({ message: "La review a bien été ajoutée", data: review });
        } else {
            res.status(400).json({ message: "Produit ou utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json("Erreur lors de l'ajout de la review.");
    }
});

app.put("/product/review", async (req, res) => {
    try {
        const modifiedReview = req.body;
        const product = await Product.findByPk(modifiedReview.productId);
        const user = await User.findByPk(modifiedReview.userId);
        if (product && user) {
            await Review.update({
                rating: modifiedReview.rating,
                content: modifiedReview.content
            }, {
                where: {
                    [Op.and]: {
                        UserId: user.id,
                        ProductId: product.id
                    }
                }
            });

            const updatedReview = await Review.findOne({
                where: {
                    [Op.and]: {
                        UserId: user.id,
                        ProductId: product.id
                    }
                }
            });
            if (updatedReview) {
                res.status(200).json(updatedReview);
            } else {
                res.status(400).json({ message: "Erreur lors de la modification" });
            }
        } else {
            res.status(400).json({ message: "Produit ou utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json("Erreur 500");
    }
});

app.get("/product/reviews/:productId", async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { ProductId: req.params.productId }
        });
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ message: "Aucune review trouvée pour ce produit." });
        }
    } catch (error) {
        res.status(500).json("Erreur 500");
    }
});

app.delete("/product/reviews/:productId", async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { ProductId: req.params.productId }
        });
        if (reviews.length > 0) {
            const reviewsDestroyed = reviews.map(review => review.dataValues);
            await Review.destroy({
                where: { ProductId: req.params.productId }
            });
            res.status(200).json({ message: "Reviews supprimées", data: reviewsDestroyed });
        } else {
            res.status(404).json({ message: "Aucune review trouvée pour ce produit" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur 500" });
    }
});

// ROUTES DES CATÉGORIES :

app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories.length > 0) {
            res.status(200).json(categories);
        } else {
            res.status(404).json({ message: "Aucune catégorie" });
        }
    } catch (error) {
        res.status(500).json("Erreur lors de la recherche des Catégories.");
    }
});

app.post("/category", checkJwt, async (req, res) => {
    const newCategory = req.body;
    try {
        const existingCategory = await Category.findOne({ where: { name: newCategory.name } });
        if (!existingCategory) {
            await Category.create(newCategory);
            res.status(200).json(newCategory.name + " a été ajouté à la liste des catégories");
        } else {
            res.status(400).json("Nom de catégorie existant");
        }
    } catch (error) {
        res.status(500).json("Erreur lors de l'ajout de la catégorie.");
    }
});

app.delete("/category/:id", checkJwt, async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            const categoryDestroyed = category.dataValues;
            await category.destroy();
            res.status(200).json({ message: "Catégorie supprimée", data: categoryDestroyed });
        } else {
            res.status(404).json({ message: "Catégorie non trouvée" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur 500" });
    }
});

app.put("/category", checkJwt, async (req, res) => {
    try {
        const modifiedCategory = req.body;
        await Category.update(modifiedCategory, {
            where: { id: modifiedCategory.id }
        });

        const updatedCategory = await Category.findByPk(modifiedCategory.id);
        if (updatedCategory) {
            res.status(200).json(updatedCategory);
        } else {
            res.status(400).json({ message: "Erreur lors de la modification" });
        }
    } catch (error) {
        res.status(500).json("Erreur 500");
    }
});

// Routes de gestion d'utilisateurs, panier, images, caractéristiques, etc. à suivre...

app.listen(8066, () => {
    console.log("Server is running on port 8066");
});
