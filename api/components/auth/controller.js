const { nanoid } = require('nanoid');
const auth = require('../../../auth/auth');

const TABLE = 'auth';

module.exports = function (injectedStore) {
  if (!injectedStore) {
    injectedStore = require('../../../store/dummy');
  }

  const login = async (payload) => {
    const { username, password } = payload;
    if (!password || !username) {
      throw new Error('Username or password info is missing');
    }
    const [authUser] = await injectedStore.query(TABLE, { username });
    if (authUser && authUser.password == password) {
      return auth.sign({ username });
    } else {
      throw new Error('Invalid username or password');
    }
  };

  const upsert = async (data) => {
    if (Object.keys(data).length == 0) {
      throw new Error('No data was sent');
    }

    const newAuth = {
      id: data.id,
      password: data.password,
      username: data.username,
    };

    return await injectedStore.upsert(TABLE, newAuth);
  };

  return {
    login,
    upsert,
  };
};
