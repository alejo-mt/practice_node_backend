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
 * @summary Retrieves a list of users.
 * @tags user
 * @return {array<User>} 200 - Success response - application/json
 * @example response - 200 - Success response example
 * {
 *   "error": false,
 *   "status": 200,
 *   "body": [
 *     {
 *       "name": "Paco",
 *       "id": 1,
 *       "age": 21
 *     },
 *     {
 *       "name": "Alison",
 *       "id": 2,
 *       "age": 23
 *     }
 *   ]
 * }
 */
router.get('/', list);

/**
 * GET /api/user/:id
 * @summary Retrieves a user by ID.
 * @tags user
 * @param {string} id.path - ID of the user to retrieve
 * @return {User} 200 - Success response - application/json
 * @example response - 200 - Success response example
 * {
 *   "error": false,
 *   "status": 200,
 *   "body": {
 *     "name": "Paco",
 *     "id": 1,
 *     "age": 21
 *   }
 * }
 */
router.get('/:id', getById);

/**
 * POST /api/user
 * @summary Create a user.
 * @tags user
 * @return {User} 201 - Success response - application/json
 * @example response - 201 - Success response example
 * {
 *   "error": false,
 *   "status": 201,
 *   "body": "done"
 * }
 */
router.post('/', upsert);

/**
 * DELETE /api/user
 * @summary Remove all user records.
 * @tags user
 * @return {User} 200 - Success response - application/json
 * @example response - 200 - Success response example
 * {
 *   "error": false,
 *   "status": 200,
 *   "body": "deleted"
 * }
 */
router.delete('/', remove);

async function list(req, res) {
  try {
    const users = await controller.list(req.body); // Use req.query for filtering/pagination
    console.log('Retrieving users');
    response.success(req, res, users, 200);
  } catch (error) {
    response.error(req, res, error.message, 500); // Use appropriate status code for server errors
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const user = await controller.getById(id);
    console.log('Retrieving user:', user);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 404); // Use appropriate status code for resource not found
  }
}

async function upsert(req, res) {
  try {
    const { body } = req;
    await controller.upsert(body);
    response.success(req, res, 'done', 201);
  } catch (error) {
    response.error(req, res, error.message, 400); // Use appropriate status code for bad request
  }
}

async function remove(req, res) {
  try {
    await controller.remove();
    response.success(req, res, 'deleted', 200); // Correct status and response body for DELETE operation
  } catch (error) {
    response.error(req, res, error.message, 400); // Use appropriate status code for bad request
  }
}

module.exports = router;
