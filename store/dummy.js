// Database
const db = {
  users: [
    { name: 'Paco', id: 1, age: 21 },
    { name: 'Alison', id: 2, age: 23 },
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

const upsert = (table, data) => {
  db[table].push(data);
  return true;
};

const remove = (table) => {
  return true;
};

module.exports = {
  get,
  getById,
  upsert,
  remove,
};
