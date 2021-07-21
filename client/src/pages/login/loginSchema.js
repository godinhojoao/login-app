import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .email('Formato de e-mail inválido')
    .required('E-mail é um campo obrigatório'),
  password: Yup.string()
    .min(5, 'Senha deve conter no minímo 5 caracteres')
    .max(50, 'Senha deve conter no máximo 50 caracteres')
    .required('Senha é um campo obrigatório')
});