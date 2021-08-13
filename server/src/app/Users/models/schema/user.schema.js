const Joi = require('joi');

module.exports = Joi.object({
  id: Joi.number().forbidden(),
  name: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/).min(3).max(50)
    .error(new Error('Nome deve conter entre 3 e 50 caracteres não númericos.')),
  email: Joi.string().email()
    .error(new Error('Formato de e-mail inválido.')),
  password: Joi.string().min(5).max(50)
    .error(new Error('Password deve conter entre 5 e 50 caracteres.')),
  confirmPassword: Joi.any().equal(Joi.ref('password'))
    .error(new Error('Ambas as senhas devem ser iguais.')),
  timestamps: Joi.object().forbidden()
});