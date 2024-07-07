const { nanoid } = require('nanoid');
const auth = require('../auth/index');
const TABLE = 'users';

module.exports = function (injectedStore) {
  if (!injectedStore) {
    injectedStore = require('../../../store/dummy');
  }

  const list = async (payload) => {
    console.log('payload', payload);
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

    const newUserData = {
      id: payload.id,
      username: payload.username,
      name: payload.name,
      age: payload.age,
    };

    await auth.upsert({
      id: payload.id,
      password: payload.password,
      username: payload.username,
    });

    return await injectedStore.upsert(TABLE, newUserData);
  };

  const query = async (payload) => {
    return await injectedStore.query(TABLE, payload);
  };

  const remove = async () => {
    return await injectedStore.remove(TABLE);
  };

  return {
    list,
    getById,
    upsert,
    remove,
  };
};
