const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

router.get('/', function (req, res) {
  const users = controller.list();
  console.log('Getting users');
  response.success(req, res, users, 200);
});

router.get('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const user = await controller.getById(id);
    console.log('Getting one user', user);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 404);
  }
});

router.post('/', async function (req, res) {
  try {
    const { body: data } = req;
    console.log('data', data);
    await controller.upsert(data);
    console.log('Creating a user');
    response.success(req, res, 'created', 201);
  } catch (error) {
    response.error(req, res, error.message, 404);
  }
});

module.exports = router;
