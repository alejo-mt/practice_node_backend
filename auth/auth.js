const jwt = require('jsonwebtoken');

const sign = (data) => {
  return jwt.sign(data, 'shhhhh');
};
module.exports = {
  sign,
};
