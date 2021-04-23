const { Router } = require('express');

const { Product, BasketProduct } = require('../../models');
const db = require("../../models/index");

const router = Router();

// GET ALL PRODUCTS
router.get('/all', async (req, res) => {
  const products = await Product.findAll({
    raw: true,
    attributes: ['id', 'name', 'price', 'url',
                [db.Sequelize.col('basketproduct.quantity'), 'quantityInBasket'],
    ],
    include: [{model: BasketProduct, as: 'basketproduct', attributes: []}],
    order: ['name']
  });
  return res.json(products);
});
// router.get('/all', async (req, res) => {
//   const products = await Product.findAll();
//   return res.json(products);
// });

// GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  const {id} = req.params; // id received from the client
  const product = await Product.findByPk(id);
  return res.json(product);
});

// GET PRODUCT BY NAME
// router.get('/', async (req, res) => {
//   const productName = req.query.name; // name received from the client
//   const returnedProduct = await Product.findOne({
//     where: {name: productName}
//   });
//   return res.json(returnedProduct);
// });



module.exports = router;