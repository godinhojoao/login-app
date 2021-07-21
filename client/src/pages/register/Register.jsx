import Form from './../components/Form/Form';
import schema from './registerSchema';

function onSubmit(values) {
  console.log(values);
};

function Register() {
  const valuesObj = {
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    placeholders: {
      name: "Digite seu nome",
      email: "Digite seu e-mail",
      password: "Digite sua senha"
    },
    inputTypes: {
      password: "password"
    }
  };
  const registerForm = Form({ schema, onSubmit, valuesObj });

  return registerForm;
};

export { Register };