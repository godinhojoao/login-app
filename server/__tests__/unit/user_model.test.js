const User = require('../../src/app/Users/models/User');

describe('User', () => {

  describe('success calls', () => {

    it('should encrypt user password when to create a user', async () => {
      const user = await User.create({
        name: "joaozaobrabo",
        email: "joaozaobrabo@gmail.com",
        password: "123456",
        confirmPassword: "123456"
      });

      await User.delete(user[0].id);

      const compareHash = await User.checkPassword(user[0], '123456');

      expect(compareHash).toBe(true);
    });

    it('should return the expected user searching by email', async () => {
      const user = await User.findByEmail('claudio@hotmail.com');

      expect(user[0].name).toBe('claudio');
      expect(user[0].email).toBe('claudio@hotmail.com');
    });
  });
});