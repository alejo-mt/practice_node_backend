const { nanoid } = require('nanoid');

const TABLE = 'auth';

module.exports = function (injectedStore) {
  if (!injectedStore) {
    injectedStore = require('../../../store/dummy.js');
  }

  const upsert = async (data) => {
    if (Object.keys(data).length == 0) {
      throw new Error('No data was sent');
    }

    const newAuth = {
      id: data.id,
      password: data.password,
    };

    return await injectedStore.upsert(TABLE, newAuth);
  };

  return {
    upsert,
  };
};
