const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./index');

/**
 * A user type
 * @typedef {object} User
 * @property {string} name.required - The name
 * @property {number} age - The age
 * @property {number} id - The ID
 */

/**
 * GET /api/user
 * @summary This is the summary of the endpoint
 * @tags user
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - success response example
{
  "error": false,
  "status": 200,
  "body": [
    {
      "name": "Paco",
      "id": 1,
      "age": 21
    },
    {
      "name": "Alison",
      "id": 2,
      "age": 23
    }
  ]
}
 */
router.get('/', list);

/**
 * GET /api/user/:id
 * @summary This is the summary of the endpoint for getting one user by Id.
 * @tags user
 * @return {User} 200 - success response - application/json
 * @example response - 200 - success response example
{
  "error": false,
  "status": 200,
  "body": {
    "name": "Paco",
    "id": 1,
    "age": 21
  }
}
 */
router.get('/:id', getById);

/**
 * POST /api/user
 * @summary Create a user.
 * @tags user
 * @return {User} 200 - success response - application/json
 * @example response - 200 - success response example
{
  "error": false,
  "status": 201,
  "body": "created"
}
 */
router.post('/', upsert);

async function list(req, res) {
  try {
    const users = await controller.list(req.body);
    console.log('Getting user/s');
    response.success(req, res, users, 200);
  } catch (error) {
    response.error(req, res, error.message, 404);
  }
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
    const { body } = req;
    await controller.upsert(body);
    console.log('Creating a user');
    response.success(req, res, 'created', 201);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
}

module.exports = router;
