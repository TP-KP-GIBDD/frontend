import React, { Component, useContext } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { formControlClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { AUTH_API_URL } from '../Api/Api';
import UserContext from '../Context';
import axios from 'axios';
import jwt from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

export default function Logiin() {
  const navigate = useNavigate();

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

  const { inputValue, setInputValue, roleId, setRoleId } =
    useContext(UserContext);

  const authenticate = (email, password) => {
    axios
      .post(AUTH_API_URL + `Accounts/authenticate`, {
        email: email,
        password,
        password,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          const user = jwt(resp.data.jwtToken);
          localStorage.setItem('token', resp.data.jwtToken);

          setRoleId(resp.data.role);
          setInputValue({
            ...inputValue,
            userId: user.Id,
            name: resp.data.firstName,
            email: resp.data.email,
            secondName: resp.data.lastName,
          });
          navigate('/profile');
        } else {
          alert('Error');
        }
      });
  };

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
            authenticate(values.email, values.password);
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
              <Link to="/registration" className="registration-btn">
                Зарегестрироваться
              </Link>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
