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
    include: [{model: Product, as: 'product', attributes: []}],
    order: [[db.Sequelize.col('product.name')]]
  });
  return res.json(basketProducts);
});

// GET BASKET PRODUCT BY PRODUCT ID
router.get('/:id', async (req, res) => {
  const {id} = req.params; // id received from the client
  const basketProduct = await BasketProduct.findOne({
    where: {
      productId: id
    }
  });
  return res.json(basketProduct);
});

// REMOVE ONE ITEM OF PRODUCT
router.put('/minus/:id', async (req, res) => {
  // product id received from the client
  const {id} = req.params;
  // check if 'id' is a valid number
  if(isNaN(Number(id))) res.status(400).send('invalid product id');
  // check the quantity of this product in the basket
  const existingBasketProduct = await BasketProduct.findOne({
    where: {
      productId: id
    }
  });
  // if it is the last one, remove it from the basket, then send the updated basket product list 
  if(existingBasketProduct.quantity < 2) {
    await BasketProduct.destroy({where: {
        productId: id
      }
    });
    const updatedBasketProducts = await BasketProduct.findAll({
      raw: true,
      attributes: ['productId', 'quantity',
                  [db.Sequelize.col('product.price'), 'price'],
                  [db.Sequelize.col('product.name'), 'name'],
                  [db.Sequelize.col('product.url'), 'url']
      ],
      include: [{model: Product, as: 'product', attributes: []}],
      order: [[db.Sequelize.col('product.name')]]
    });
    return res.json(updatedBasketProducts);
  }
  // if there are more than one of this product, decrease the quantity, then send the updated basket product list
  await BasketProduct.update({quantity: existingBasketProduct.quantity-1}, {
    where: {
      productId: id
    }
  });
  const updatedBasketProducts = await BasketProduct.findAll({
    raw: true,
    attributes: ['productId', 'quantity',
                [db.Sequelize.col('product.price'), 'price'],
                [db.Sequelize.col('product.name'), 'name'],
                [db.Sequelize.col('product.url'), 'url']
    ],
    include: [{model: Product, as: 'product', attributes: []}],
    order: [[db.Sequelize.col('product.name')]]
  });
  return res.json(updatedBasketProducts);
});

// ADD ONE ITEM OF ITEM
router.put('/plus/:id', async (req, res) => {
  // product id received from the client
  const {id} = req.params; 
  // check if 'id' is a valid number
  if(isNaN(Number(id))) res.status(400).send('invalid product id');
  // check if this product exists in the basket
  const existingBasketProduct = await BasketProduct.findOne({
    where: {
      productId: id
    }
  });
  // if not, add it to the basket, and return the updated basket products list
  if(!existingBasketProduct) {
    await BasketProduct.create({
      productId: id,
      quantity: 1
    });
    const updatedBasketProducts = await BasketProduct.findAll({
      raw: true,
      attributes: ['productId', 'quantity',
                  [db.Sequelize.col('product.price'), 'price'],
                  [db.Sequelize.col('product.name'), 'name'],
                  [db.Sequelize.col('product.url'), 'url']
      ],
      include: [{model: Product, as: 'product', attributes: []}],
      order: [[db.Sequelize.col('product.name')]]
    });
    return res.json(updatedBasketProducts);
  }
  // if it is already in the basket, increase the quantity, then send the updated basket product list
  await BasketProduct.update({quantity: existingBasketProduct.quantity+1}, {
    where: {
      productId: id
    }
  });
  const updatedBasketProducts = await BasketProduct.findAll({
    raw: true,
    attributes: ['productId', 'quantity',
                [db.Sequelize.col('product.price'), 'price'],
                [db.Sequelize.col('product.name'), 'name'],
                [db.Sequelize.col('product.url'), 'url']
    ],
    include: [{model: Product, as: 'product', attributes: []}],
    order: [[db.Sequelize.col('product.name')]]
  });
  return res.json(updatedBasketProducts);
});

// DELETE PRODUCT FROM BASKET
router.delete('/:id', async (req, res) => {
  // product id received from the client
  const {id} = req.params;
  // check if 'id' is a valid number
  if(isNaN(Number(id))) res.status(400).send('invalid product id');
  // check if this product exists in the basket
  const basketProduct = await BasketProduct.findOne({
    where: {
      productId: id
    }
  });
  // if not, return error
  if(!basketProduct) res.status(400).send('no such product in the basket');
  // if it is in the basket, remove it, then return the updated basket products list
  await BasketProduct.destroy({
    where: {
      productId: id
    }
  });
  const updatedBasketProducts = await BasketProduct.findAll({
    raw: true,
    attributes: ['productId', 'quantity',
                [db.Sequelize.col('product.price'), 'price'],
                [db.Sequelize.col('product.name'), 'name'],
                [db.Sequelize.col('product.url'), 'url']
    ],
    include: [{model: Product, as: 'product', attributes: []}],
    order: [[db.Sequelize.col('product.name')]]
  });
  return res.json(updatedBasketProducts);
}); 

// SET ITEM QUANTITY BASKET
router.put('/quantity', async (req, res) => {
  // id and quantity received from the client
  // return res.json(req.body)
  const {id, quantity} = req.body;
  // return res.json({quantity})
  // check if 'id' and 'quantity' are valid numbers
  if(isNaN(Number(id)) || isNaN(Number(quantity)) || quantity < 0) res.status(400).send('bad request')
  if(quantity === 0) {
    await BasketProduct.destroy({
      where: {
        productId: id
      }
    }
  );
  const updatedBasketProducts = await BasketProduct.findAll({
    raw: true,
    attributes: ['productId', 'quantity',
                [db.Sequelize.col('product.price'), 'price'],
                [db.Sequelize.col('product.name'), 'name'],
                [db.Sequelize.col('product.url'), 'url']
    ],
    include: [{model: Product, as: 'product', attributes: []}],
    order: [[db.Sequelize.col('product.name')]]
  });
  return res.json(updatedBasketProducts);
  }
  // check if this product is already in the basket
  const existingBasketProduct = await BasketProduct.findOne({where: {
    productId: id
  }});
  // if not, add it to the basket, then return the updated basket products list
  if(!existingBasketProduct) {
    await BasketProduct.create({
      productId: id,
      quantity: quantity
    }
  );
  const updatedBasketProducts = await BasketProduct.findAll({
    raw: true,
    attributes: ['productId', 'quantity',
                [db.Sequelize.col('product.price'), 'price'],
                [db.Sequelize.col('product.name'), 'name'],
                [db.Sequelize.col('product.url'), 'url']
    ],
    include: [{model: Product, as: 'product', attributes: []}],
    order: [[db.Sequelize.col('product.name')]]
  });
  return res.json(updatedBasketProducts);
  }
  // if it already exists, change its quantity, then return the updated basket products list
  await BasketProduct.update({quantity: quantity}, {
    where: {
      productId: id
    }
  });
  const updatedBasketProducts = await BasketProduct.findAll({
    raw: true,
    attributes: ['productId', 'quantity',
                [db.Sequelize.col('product.price'), 'price'],
                [db.Sequelize.col('product.name'), 'name'],
                [db.Sequelize.col('product.url'), 'url']
    ],
    include: [{model: Product, as: 'product', attributes: []}],
    order: [[db.Sequelize.col('product.name')]]
  });
  return res.json(updatedBasketProducts);
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