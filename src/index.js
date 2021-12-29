import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './Context';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_API_URL } from './Api/Api';
import jwt from 'jwt-decode';

export default function Main() {
  const [roleId, setRoleId] = useState('');
  const [inputValue, setInputValue] = useState({
    userId: 0,
    name: '',
    secondName: '',
    middleName: '',
    dateBirth: '',
    phone: '',
    email: '',
    snils: '1542624742',
    inn: '12415436',
  });

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      axios
        .get(
          AUTH_API_URL + `Accounts/${jwt(localStorage.getItem('token')).id}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then((resp) => {
          setRoleId(resp.data.role);
          console.log(resp.data);
          setInputValue({
            ...inputValue,
            userId: resp.data.id,
            name: resp.data.firstName,
            secondName: resp.data.lastName,
            middleName: resp.data.middleName,
            dateBirth: resp.data.birthday,
            phone: resp.data.phone,
            email: resp.data.email,
          });
          console.log(resp.data);
        });
    }
  }, []);

  return (
    <React.StrictMode>
      <UserContext.Provider
        value={{ roleId, setRoleId, inputValue, setInputValue }}
      >
        <App />
      </UserContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
