const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const config = require('../config.js');
const user = require('./components/user/network');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

expressJSDocSwagger(app)(config.docs);

// ROUTER
app.use('/api/user', user);

app.listen(config.api.port, () => {
  console.log('Server listening on port', config.api.port);
});
