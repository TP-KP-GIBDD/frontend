import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './Context';
import { useState } from 'react';

export default function Main() {
  const [roleId, setRoleId] = useState(0);
  const [inputValue, setInputValue] = useState({
    name: 'Глеб',
    secondName: 'Лабутенко',
    middleName: 'Александрович',
    dateBirth: '20.11.2001',
    phone: '+7(920)-623-36-09',
    email: 'gleb-ilin@list.ru',
    snils: '555-555-555 55',
    inn: '7707083893',
  });

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
