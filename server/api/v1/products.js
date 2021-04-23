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


// SEARCH PRODUCTS BY NAME
router.get('/search', async (req, res) => {
  const searchString = req.query.q;
  if(typeof searchString !== 'string') res.status(400).send('bad request');
  const filteredProducts = await Product.findAll({
    raw: true,
    attributes: ['id', 'name', 'price', 'url',
                [db.Sequelize.col('basketproduct.quantity'), 'quantityInBasket'],
    ],
    include: [{model: BasketProduct, as: 'basketproduct', attributes: []}],
    where: {
      name: {
        [db.Sequelize.Op.regexp]: `^${searchString}`
      }
    },
    order: ['name']
  });
  return res.json(filteredProducts);
});

// GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  const {id} = req.params; // id received from the client
  const product = await Product.findByPk(id);
  return res.json(product);
});


module.exports = router;