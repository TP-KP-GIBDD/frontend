import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { formControlClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default class Logiin extends Component {
  render() {
    const validationsSchema = yup.object().shape({
      password: yup
        .string()
        .typeError('Должно быть строкой')
        .required('Обязательное поле')
        .min(6, 'Не менее 6 символов.'),
      email: yup
        .string()
        .email('Введите верный Email')
        .required('Обязательное поле'),
    });

    return (
      <div>
        <div>
          <h1 className="online-service">Вход</h1>
        </div>
        <div>
          <Formik
            initialValues={{
              password: '',
              email: '',
            }}
            validateOnBlur
            onSubmit={(values) => {
              console.log(values);
            }}
            validationSchema={validationsSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
              dirty,
            }) => (
              <div className={'login-form'}>
                <p>
                  {/* <label htmlFor={"name"}>Имя</label> */}

                  <br />
                  {/* <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  /> */}
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    className={'registration-input'}
                    type={'email'}
                    name={'email'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </p>
                {touched.email && errors.email && (
                  <p className={'error'}>{errors.email}</p>
                )}

                <p>
                  {/* <label htmlFor={"name"}>Имя</label> */}

                  <br />
                  {/* <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                  /> */}
                  <TextField
                    id="outlined-basic"
                    label="Пароль"
                    variant="outlined"
                    className={'registration-input'}
                    type={'password'}
                    name={'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </p>
                {touched.password && errors.password && (
                  <p className={'error'}>{errors.password}</p>
                )}

                <Button
                  className={'registration-button'}
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                  type={'submit'}
                  variant="contained"
                >
                  Войти
                </Button>
                <br />
                <a href="/registration" className="registration-btn">
                  Зарегестрироваться
                </a>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
