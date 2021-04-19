const { Router } = require("express");
const router = Router();

router.use('/people', require('./people'));
// router.use('/comments', require('./comments'));
// router.use('/comments', require('./comments'));

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

router.use(unknownEndpoint);

module.exports = router;