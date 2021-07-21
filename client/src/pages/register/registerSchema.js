import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .min(3, 'Nome deve conter no minímo 3 caracteres')
    .max(50, 'Nome deve conter no máximo 50 caracteres')
    .required('Nome é um campo obrigatório'),
  email: Yup.string()
    .email('Formato de e-mail inválido')
    .required('E-mail é um campo obrigatório'),
  password: Yup.string()
    .min(5, 'Senha deve conter no minímo 5 caracteres')
    .max(50, 'Senha deve conter no máximo 50 caracteres')
    .required('Senha é um campo obrigatório')
});