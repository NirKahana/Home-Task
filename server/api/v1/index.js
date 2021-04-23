const { Router } = require("express");
const router = Router();

router.use('/products', require('./products'));
router.use('/basket', require('./basketProducts'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use(unknownEndpoint);

module.exports = router;