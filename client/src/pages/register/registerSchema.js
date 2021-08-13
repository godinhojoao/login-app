import * as Yup from 'yup';

let isAddMode = null;

export default Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/, 'Nome não deve conter caracteres númericos.')
    .min(3, 'Nome deve conter no minímo 3 caracteres.')
    .max(50, 'Nome deve conter no máximo 50 caracteres.')
    .required('Nome é um campo obrigatório.'),
  email: Yup.string()
    .email('Formato de e-mail inválido.')
    .required('E-mail é um campo obrigatório.'),
  password: Yup.string()
    .concat(isAddMode ? Yup.string().required('Senha é um campo obrigatório.') : null)
    .min(5, 'Senha deve conter no minímo 5 caracteres.')
    .max(50, 'Senha deve conter no máximo 50 caracteres.')
    .required('Senha é um campo obrigatório.'),
  confirmPassword: Yup.string()
    .when('password', (password, schema) => {
      if (password || isAddMode) return schema.required('É obrigatório confirmar a senha.');
    })
    .oneOf([Yup.ref('password'), null], 'Ambas as senhas devem ser iguais.')
});