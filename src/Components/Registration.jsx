import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { AUTH_API_URL } from '../Api/Api';

const validationsSchema = yup.object().shape({
  firstName: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Обязательное поле'),
  secondName: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Обязательное поле'),
  middleName: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Обязательное поле'),
  phone: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Обязательное поле')
    .min(11, 'Не менее 11 символов.'),
  password: yup
    .string()
    .typeError('Должно быть строкой')
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
  email: yup
    .string()
    .email('Введите верный Email')
    .required('Обязательное поле'),
  confirmEmail: yup
    .string()
    .email('Введите верный Email')
    .oneOf([yup.ref('email')], 'Email не совпадают')
    .required('Обязательное поле'),
});

export default function Registration() {
  const register = (values) => {
    console.log(values);
    axios
      .post(AUTH_API_URL + `Accounts/register`, {
        firstName: values.firstName,
        lastName: values.secondName,
        middleName: values.middleName,
        birthday: values.birthDate,
        // gender: values.gender,
        gender: 'Мужской',
        phone: values.phone,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        acceptTerms: true,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          window.location = '/login';
          console.log('success');
        } else {
          alert('Error');
        }
      });
  };

  return (
    <div>
      <div>
        <h1 className="online-service">Регистрация</h1>
      </div>
      <div>
        <Formik
          initialValues={{
            firstName: '',
            secondName: '',
            middleName: '',
            birthDate: '',
            gender: 'Мужской',
            phone: '',
            password: '',
            confirmPassword: '',
            email: '',
            confirmEmail: '',
          }}
          validateOnBlur
          onSubmit={(values) => {
            console.log(values);
            console.log('TEST');
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
            <div className={'registration-form'}>
              <p>
                <br />

                <TextField
                  id="outlined-basic"
                  label="Имя"
                  variant="outlined"
                  className={'registration-input'}
                  type={'text'}
                  name={'firstName'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  size="small"
                />
              </p>

              {touched.firstName && errors.firstName && (
                <p className={'error'}>{errors.firstName}</p>
              )}

              <p>
                <br />

                <TextField
                  id="outlined-basic"
                  label="Фамилия"
                  variant="outlined"
                  className={'registration-input'}
                  type={'text'}
                  name={'secondName'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.secondName}
                  size="small"
                />
              </p>

              {touched.secondName && errors.secondName && (
                <p className={'error'}>{errors.secondName}</p>
              )}

              <p>
                <br />

                <TextField
                  id="outlined-basic"
                  label="Отчество"
                  variant="outlined"
                  className={'registration-input'}
                  type={'text'}
                  name={'middleName'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.middleName}
                  size="small"
                />
              </p>

              {touched.middleName && errors.middleName && (
                <p className={'error'}>{errors.middleName}</p>
              )}

              <p>
                <br />

                <TextField
                  id="outlined-basic"
                  label="Год рождения"
                  variant="outlined"
                  className={'registration-input'}
                  type={'text'}
                  name={'birthDate'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.birthDate}
                  size="small"
                />
              </p>

              <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">Пол</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  defaultValue="Мужской"
                  name="radio-buttons-group"
                  value={values.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Мужской"
                    control={<Radio />}
                    label="Мужской"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="Женский"
                    control={<Radio />}
                    label="Женский"
                    onChange={handleChange}
                  />
                </RadioGroup>
              </FormControl>

              <p>
                <br />

                <TextField
                  id="outlined-basic"
                  label="Телефон"
                  variant="outlined"
                  className={'registration-input'}
                  type={'text'}
                  name={'phone'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  size="small"
                />
              </p>
              {touched.phone && errors.phone && (
                <p className={'error'}>{errors.phone}</p>
              )}

              <p>
                <br />

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
                  size="small"
                />
              </p>
              {touched.password && errors.password && (
                <p className={'error'}>{errors.password}</p>
              )}

              <p>
                <br />

                <TextField
                  id="outlined-basic"
                  label="Подтвердите пароль"
                  variant="outlined"
                  className={'registration-input'}
                  type={'password'}
                  name={'confirmPassword'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  size="small"
                />
              </p>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className={'error'}>{errors.confirmPassword}</p>
              )}

              <p>
                <br />

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
                  size="small"
                />
              </p>
              {touched.email && errors.email && (
                <p className={'error'}>{errors.email}</p>
              )}

              <Button
                className={'registration-button'}
                disabled={!isValid && !dirty}
                onClick={() => {
                  register(values);
                }}
                // type={'submit'}
                variant="contained"
              >
                Зарегестрироваться
              </Button>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
