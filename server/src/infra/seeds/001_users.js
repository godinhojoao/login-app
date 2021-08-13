// all passwords are 123456
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'joao',
          email: 'joao@gmail.com',
          password: '$2b$10$XfwUEsqoUK4tU9pDKY570u4KmyJDcNVF1coPxqgXIF3coubEvmR2W'
        },
        {
          name: 'jorge',
          email: 'joao@outlook.com.br',
          password: '$2b$10$XfwUEsqoUK4tU9pDKY570u4KmyJDcNVF1coPxqgXIF3coubEvmR2W'
        },
        {
          name: 'claudio',
          email: 'claudio@hotmail.com',
          password: '$2b$10$XfwUEsqoUK4tU9pDKY570u4KmyJDcNVF1coPxqgXIF3coubEvmR2W'
        }
      ]);
    });
};
