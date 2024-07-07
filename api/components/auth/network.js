const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

router.get('/login', login);

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const token = await controller.login({ username, password });
    response.success(req, res, token, 200);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
}

module.exports = router;
