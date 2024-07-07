const store = require('../../../store/dummy');
const ctrl = require('./controller');

// Here we define wich store (db object) must to be passed to the controller.

module.exports = ctrl(store);
