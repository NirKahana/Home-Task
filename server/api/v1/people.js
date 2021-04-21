const { Router } = require('express');
// const moment = require('moment');

const { Person } = require('../../models');
// const db = require("../../models/index");

const router = Router();

// GET ALL PEOPLE
router.get('/all', async (req, res) => {
  const people = await Person.findAll();
  return res.json(people);
});

// GET PERSON BY ID
router.get('/:id', async (req, res) => {
  const {id} = req.params; // id received from the client
  const people = await Person.findByPk(id);
  return res.json(people);
});

// GET PERSON BY NAME
router.get('/', async (req, res) => {
  const personName = req.query.name; // name received from the client
  const returnedPerson = await Person.findOne({
    where: {name: personName}
  });
  return res.json(returnedPerson);
});



module.exports = router;