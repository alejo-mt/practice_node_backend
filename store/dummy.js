const { nanoid } = require('nanoid');

// Dummy Database
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
  return col.find((item) => item.id === id) || null;
};

const upsert = (table, payload) => {
  if (!db[table]) {
    db[table] = [];
  }

  const index = db[table].findIndex((item) => item.id === payload.id);

  if (index === -1) {
    db[table].push(payload); // Insert new record
  } else {
    db[table][index] = payload; // Update existing record
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

const query = async (table, payload) => {
  const prop = Object.keys(payload)[0];
  const result = db[table].filter((item) => item[prop] === payload[prop]);
  return result || null;
};

module.exports = {
  get,
  getById,
  upsert,
  remove,
  query,
};
