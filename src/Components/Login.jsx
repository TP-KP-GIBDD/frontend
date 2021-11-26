import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { formControlClasses } from "@mui/material";
import TextField from "@mui/material/TextField";

export default class Login extends Component {
  render() {
    const validationsSchema = yup.object().shape({
      name: yup
        .string()
        .typeError("Должно быть строкой")
        .required("Обязательное поле"),
      secondName: yup
        .string()
        .typeError("Должно быть строкой")
        .required("Обязательное поле"),
      password: yup
        .string()
        .typeError("Должно быть строкой")
        .required("Обязательное поле")
        .min(6, "Не менее 6 символов."),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Пароли не совпадают"),
    });

    return (
      <div>
        <div>
          <h1 className="online-service">Регистрация</h1>
        </div>
        <div>
          <Formik
            initialValues={{
              name: "",
              secondName: "",
              password: "",
              confirmPassword: "",
              email: "",
              confirmEmail: "",
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
              <div className={"registration-form"}>
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
                    label="Имя"
                    variant="outlined"
                    className={"registration-input"}
                    type={"text"}
                    name={"name"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </p>
                {touched.name && errors.name && (
                  <p className={"error"}>{errors.name}</p>
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
                    label="Фамилия"
                    variant="outlined"
                    className={"registration-input"}
                    type={"text"}
                    name={"secondName"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondName}
                  />
                </p>
                {touched.secondName && errors.secondName && (
                  <p className={"error"}>{errors.secondName}</p>
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
                    className={"registration-input"}
                    type={"password"}
                    name={"password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </p>
                {touched.password && errors.password && (
                  <p className={"error"}>{errors.password}</p>
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
                    label="Подтвердите пароль"
                    variant="outlined"
                    className={"registration-input"}
                    type={"password"}
                    name={"confirmPassword"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </p>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className={"error"}>{errors.confirmPassword}</p>
                )}

                <button
                  disabled={!isValid && !dirty}
                  onClick={handleSubmit}
                  type={"submit"}
                >
                  Отправить
                </button>
              </div>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
