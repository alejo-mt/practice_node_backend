const { nanoid } = require('nanoid');

// Dummy Database
const ID = nanoid();
const db = {
  users: [{ name: 'Paco', username: 'paquirri', id: ID, age: 21 }],
  auth: [{ username: 'paquirri', id: ID, password: 'admin123' }],
};

// Database object methods

const get = (table) => {
  return db[table];
};

const getById = async (table, id) => {
  const col = db[table];
  return col.find((item) => item.id === id) || null;
};

const upsert = (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }

  const index = db[table].findIndex((item) => item.id === data.id);

  if (index === -1) {
    db[table].push(data); // Insert new record
  } else {
    db[table][index] = data; // Update existing record
  }

  return true;
};

const remove = (table) => {
  if (db[table]) {
    db[table] = [];
    return true;
  }
  return false;
};

const query = async (table, params) => {
  const prop = Object.keys(params)[0];
  const result =
    db[table].filter((item) => item[prop] === params[prop]) || null;
  return result;
};

module.exports = {
  get,
  getById,
  upsert,
  remove,
  query,
};
