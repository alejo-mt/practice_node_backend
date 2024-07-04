const TABLE = 'users';

module.exports = function (injectedStore) {
  if (!injectedStore) {
    injectedStore = require('../../../store/dummy.js');
  }

  const list = () => {
    return injectedStore.get(TABLE);
  };

  const getById = async (id) => {
    const user = await injectedStore.getById(TABLE, id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };

  const upsert = async (data) => {
    if (Object.keys(data).length == 0) {
      throw new Error('No data was sent');
    }
    return await injectedStore.upsert(TABLE, data);
  };

  return {
    list,
    getById,
    upsert,
  };
};
