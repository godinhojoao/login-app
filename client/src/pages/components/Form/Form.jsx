import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from "react-router-dom";

import { Button } from './../Button/Button';
import { IconsManager } from '../../../assets/icons/IconsManager';

import './Form.scss';

function CustomForm({ schema, onSubmit, valuesObj, loginForm = false }) {
  const iconsManager = new IconsManager();
  const [showPassword, setShowPassword] = useState({
    password: { value: false },
    confirmPassword: { value: false }
  });
  const fields = Object.keys(valuesObj.initialValues);

  function hideAndShowPasswords(field) {
    showPassword[field].value = !showPassword[field].value;
    setShowPassword({ ...showPassword });
  }

  return (
    <>
      <h1 className="title">{loginForm ? 'Entrar' : 'Registrar'}</h1>
      <p className="description">
        {loginForm ?
          <span>
            Não possui uma conta?
            <span className="link-style">
              <Link to="/register"> registrar</Link>
            </span>
          </span>
          :
          <span>
            Já possui uma conta?
            <span className="link-style">
              <Link to="/login"> entrar</Link>
            </span>
          </span>
        }
      </p>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={valuesObj.initialValues} >
        {({ errors, touched, isValid, values }) => {
          return (
            <Form className="login-container">
              {
                fields.map((field, index) => {
                  return (
                    <div key={index} className={`login-container__input-container ${valuesObj.inputTypes[field] === 'password' ? 'password-container' : ''}`}>
                      <Field
                        autoFocus={(loginForm && field === 'email') || (!loginForm && field === 'name')}
                        name={field}
                        autoComplete={loginForm ? 'on' : 'off'}
                        type={
                          valuesObj.inputTypes[field] === 'password' ?
                            showPassword[field].value ? 'text' : 'password'
                            :
                            'text'
                        }
                        className={`input-effect ${values[field] ? 'has-content' : ''}`} />
                      <label>{valuesObj.labels[field]}</label>
                      {errors[field] && touched[field] &&
                        <span className="login-container__input-container__error">{errors[field]}</span>
                      }
                      {valuesObj.inputTypes[field] === 'password' &&
                        <span onClick={() => { hideAndShowPasswords(field); }
                        } >
                          {showPassword[field].value ?
                            <iconsManager.VisibilityOnIcon />
                            :
                            <iconsManager.VisibilityOffIcon />
                          }
                        </span>
                      }
                    </div>
                  );
                })
              }
              {loginForm ?
                <>
                  <Button
                    buttonText="Entrar"
                    disabled={!isValid}
                    className={!isValid ? 'disabled' : ''} />
                </>
                :
                <>
                  <Button
                    buttonText="Registrar"
                    disabled={!isValid}
                    className={!isValid ? 'disabled' : ''} />
                </>
              }
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default CustomForm;