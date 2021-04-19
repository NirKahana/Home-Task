const { Router } = require('express');
const { Person } = require('../../models');
const db = require("../../models/index");


const router = Router();

router.get('/all', async (req, res) => {
  const people = await Person.findAll();
  return res.json(people);
}); 

module.exports = router;