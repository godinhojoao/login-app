import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

import './Form.scss';

function CustomForm({ schema, onSubmit, valuesObj }) {
  const [showPassword, setShowPassword] = useState(false);
  const fields = Object.keys(valuesObj.initialValues);

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={valuesObj.initialValues} >
        {({ values, errors, touched, isValid }) => {
          return (
            <Form className="login-container">
              {
                fields.map((field, index) => {
                  return (
                    <div key={index} className={`login-container__input-container ${valuesObj.inputTypes[field] === 'password' ? 'password-container' : ''}`}>
                      <Field
                        name={field}
                        type={
                          valuesObj.inputTypes[field] === 'password' ?
                            showPassword ? 'text' : 'password'
                            :
                            'text'
                        }
                        placeholder={valuesObj.placeholders[field]} />
                      {errors[field] && touched[field] &&
                        <span className="login-container__input-container__error">{errors[field]}</span>
                      }
                      {valuesObj.inputTypes[field] === 'password' &&
                        <img
                          alt={showPassword ? "Olho aberto" : "Olho fechado"}
                          src={showPassword ?
                            "https://img.icons8.com/material-rounded/22/000000/visible.png"
                            :
                            "https://img.icons8.com/material-sharp/22/000000/closed-eye.png"
                          }
                          onClick={() => setShowPassword(!showPassword)} />
                      }
                    </div>
                  );
                })
              }
              <button type="submit" disabled={!isValid} className={!isValid ? 'disabled' : ''}>Enviar</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CustomForm;