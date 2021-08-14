const User = require('../../src/app/Users/models/User');

describe('USER MODEL success calls', () => {

  it('User.getAll : should return an users list', async () => {
    const users = await User.getAll();

    expect(users).toEqual([
      { id: 3, name: 'claudio', email: 'claudio@hotmail.com' },
      { id: 1, name: 'joao', email: 'joao@gmail.com' },
      { id: 2, name: 'jorge', email: 'joao@outlook.com.br' }
    ]);
  });

  it('User.findOne : sending an id should return an user', async () => {
    const [user] = await User.findOne(1);

    expect(user).toEqual({
      id: 1,
      name: 'joao',
      email: 'joao@gmail.com'
    });
  });

  it('User.findByEmail : sending an email should return an user', async () => {
    const [user] = await User.findByEmail('joao@gmail.com');

    expect(user).toEqual({
      id: 1,
      name: 'joao',
      email: 'joao@gmail.com',
      password: expect.any(String)
    });
  });

  it('User.create : sending user data should create an user', async () => {
    const userToCreate = {
      name: 'claudia',
      email: 'claudia@gmail.com',
      password: "dalee",
      confirmPassword: "dalee"
    }
    const [user] = await User.create(userToCreate);

    expect(user).toEqual({
      id: 4,
      name: 'claudia',
      email: 'claudia@gmail.com'
    });
  });

  it('User.update : sending user data with id should update an user', async () => {
    const userToUpdate = {
      id: 4,
      name: 'claudinha',
      email: 'claudinha@gmail.com',
    }
    const [user] = await User.update(userToUpdate);

    expect(user).toEqual({
      id: 4,
      name: 'claudinha',
      email: 'claudinha@gmail.com'
    });
  });

  it('User.delete : sending an user id should delete the same', async () => {
    const result = await User.delete(4);
    const users = await User.getAll();

    expect(result).toBe(true);
    expect(users).toEqual([
      { id: 3, name: 'claudio', email: 'claudio@hotmail.com' },
      { id: 1, name: 'joao', email: 'joao@gmail.com' },
      { id: 2, name: 'jorge', email: 'joao@outlook.com.br' }
    ]);
  });

  it('User.checkPassword : sending an user and a password should compare them', async () => {
    const [user] = await User.findByEmail('joao@gmail.com');
    const correctResult = await User.checkPassword(user, '123456');
    const incorrectResult = await User.checkPassword(user, '1234456');

    expect(correctResult).toBe(true);
    expect(incorrectResult).toBe(false);
  });
});