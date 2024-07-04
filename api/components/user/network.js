const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

router.get('/', list());

router.get('/:id', getById());

router.post('/', upsert());

function list(req, res) {
  const users = controller.list();
  console.log('Getting users');
  response.success(req, res, users, 200);
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const user = await controller.getById(id);
    console.log('Getting one user', user);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 404);
  }
}

async function upsert(req, res) {
  try {
    const { body: data } = req;
    console.log('data', data);
    await controller.upsert(data);
    console.log('Creating a user');
    response.success(req, res, 'created', 201);
  } catch (error) {
    response.error(req, res, error.message, 404);
  }
}

module.exports = router;
