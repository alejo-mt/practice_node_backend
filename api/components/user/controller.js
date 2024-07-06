const { nanoid } = require('nanoid');
const auth = require('../auth/index.js');
const TABLE = 'users';

module.exports = function (injectedStore) {
  if (!injectedStore) {
    injectedStore = require('../../../store/dummy.js');
  }

  const list = async (payload) => {
    let user;
    if (Object.keys(payload).length != 0) {
      user = await query(payload);
    } else {
      user = injectedStore.get(TABLE);
    }
    return user;
  };

  const getById = async (id) => {
    const user = await injectedStore.getById(TABLE, id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };

  const upsert = async (payload) => {
    if (Object.keys(payload).length == 0) {
      throw new Error('No data was sent');
    }
    if (!payload.id) {
      payload.id = nanoid();
    }

    const newUser = {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      age: payload.age,
    };

    await auth.upsert({
      id: payload.id,
      password: payload.password,
    });

    return await injectedStore.upsert(TABLE, newUser);
  };

  const query = async (params) => {
    return await injectedStore.query(TABLE, params);
  };

  return {
    list,
    getById,
    upsert,
  };
};
