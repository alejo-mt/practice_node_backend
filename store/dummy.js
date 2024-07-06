const { nanoid } = require('nanoid');
// Database
const db = {
  users: [
    { name: 'Paco', username: 'paquirri', id: nanoid(), age: 21 },
    { name: 'Alison', username: 'aliss', id: nanoid(), age: 23 },
  ],
};

// Database object methods
const get = (table) => {
  return db[table];
};

const getById = async (table, id) => {
  const col = db[table];
  return col.filter((item) => item.id == id)[0] || null;
};

const upsert = (table, payload) => {
  if (!db[table]) {
    db[table] = [];
  }
  db[table].push(payload);
  return true;
};

const remove = (table) => {
  return true;
};

const query = async (table, payload) => {
  const prop = Object.keys(payload)[0];
  const result = db[table].find((item) => item[prop] == payload[prop]);
  return result;
};

module.exports = {
  get,
  getById,
  upsert,
  remove,
  query,
};
