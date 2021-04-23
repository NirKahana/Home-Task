const { Router } = require('express');

const { BasketProduct, Product } = require('../../models');
const db = require("../../models/index");

const router = Router();

// GET ALL BASKET PRODUCTS
router.get('/all', async (req, res) => {
  const basketProducts = await BasketProduct.findAll({
    raw: true,
    attributes: ['productId', 'quantity',
                [db.Sequelize.col('product.price'), 'price'],
                [db.Sequelize.col('product.name'), 'name'],
                [db.Sequelize.col('product.url'), 'url']
    ],
    include: [{model: Product, as: 'product', attributes: []}]
  });
  return res.json(basketProducts);
});

// GET BASKET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  const {id} = req.params; // id received from the client
  const basketProduct = await BasketProduct.findByPk(id);
  return res.json(basketProduct);
});

// REMOVE ITEM FROM BASKET
router.put('/remove/:id', async (req, res) => {
  const {id} = req.params; // id received from the client
  if(isNaN(Number(id))) res.status(400).send('bad request') // check if 'id' is a valid number
  const existingBasketProduct = await BasketProduct.findByPk(id);
  if(existingBasketProduct.quantity < 2) {
    await BasketProduct.destroy({where: {
        id: id
      }
    });
    res.send('item successfully deleted')
  }
  await BasketProduct.update({quantity: existingBasketProduct.quantity-1}, {
    where: {
      id: id
    }
  });
  const updatedBasketProduct = await BasketProduct.findByPk(id);
  return res.json(updatedBasketProduct);
});

// ADD ITEM TO BASKET
router.put('/add/:id', async (req, res) => {
  const {id} = req.params; // id received from the client
  const allProducts = await Product.findAll();
  if(!allProducts.some(product => product.id === Number(id))) res.status(400).send('invalid product id')
  if(isNaN(Number(id))) res.status(400).send('bad request')
  const existingBasketProduct = await BasketProduct.findOne({where: {
    productId: id
  }});
  if(!existingBasketProduct) {
    await BasketProduct.create({
      productId: id,
      quantity: 1
    });
    const newBasketProduct = await BasketProduct.findOne({where: {
      productId: id
    }});
    res.json(newBasketProduct)
  }
  await BasketProduct.update({quantity: existingBasketProduct.quantity+1}, {
    where: {
      productId: id
    }
  });
  const updatedBasketProduct = await BasketProduct.findOne({where: {
    productId: id
  }});;
  return res.json(updatedBasketProduct);
});

// SET ITEM QUANTITY BASKET
router.put('/quantity', async (req, res) => {
  const {id, quantity} = req.query; // id and quantity received from the client
  if(isNaN(Number(id)) || isNaN(Number(quantity)) || quantity < 0) res.status(400).send('bad request')
  const existingBasketProduct = await BasketProduct.findOne({where: {
    productId: id
  }});
  if(!existingBasketProduct) {
    await BasketProduct.create({
      productId: id,
      quantity: quantity
    });
    const newBasketProduct = await BasketProduct.findOne({where: {
      productId: id
    }});
    res.json(newBasketProduct)
  }
  await BasketProduct.update({quantity: quantity}, {
    where: {
      id: id
    }
  });
  const updatedBasketProduct = await BasketProduct.findOne({where: {
    productId: id
  }});;
  return res.json(updatedBasketProduct);
});

// GET PERSON BY NAME
// router.get('/', async (req, res) => {
//   const basketProductName = req.query.name; // name received from the client
//   const returnedBasketProduct = await BasketProduct.findOne({
//     where: {name: basketProductName}
//   });
//   return res.json(returnedBasketProduct);
// });



module.exports = router;