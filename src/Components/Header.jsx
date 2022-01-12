import {
  AppBar,
  appBarClasses,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import UserContext from '../Context';
import Avatar from '@mui/material/Avatar';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../Assets/logo.png';

export default function Header() {
  const navigate = useNavigate();

  const { roleId, setRoleId } = useContext(UserContext);

  const hundleOutlog = () => {
    console.log('test');
    localStorage.removeItem('token');
    setRoleId('');
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/">
        <div className="header-left">
          <div className="header-left-1">
            <img className="logop" src={logo} />
          </div>

          <h1 className="logo">ГОСАВТОИНСПЕКЦИЯ</h1>
        </div>
      </Link>
      <div className="header-right">
        <div className="header-profile">
          {/* {roleId === 0 && (
            <Button
              href="/profile"
              className="profile-btn"
              variant="contained"
              size="medium"
            >
              Профиль
            </Button>
          )} */}
          {(roleId === 'Admin' ||
            roleId === 'Carowner' ||
            roleId === 'Inspector') && (
            <Link to="/profile">
              <IconButton
                className="profile-btn"
                // href="/profile"
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>П</Avatar>
              </IconButton>
            </Link>
          )}
        </div>
        <div className="header-nav">
          <ul>
            {(roleId === 'Admin' || roleId === 'Inspector') && (
              <li>
                <Link to="/employee" className="btn">
                  Сотруднику
                </Link>
              </li>
            )}
            <li>
              <Link to="/" className="btn">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="btn">
                Контакты
              </Link>
            </li>
            {(roleId === 'Admin' ||
              roleId === 'Carowner' ||
              roleId === 'Inspector') && (
              <li>
                <Link to="/services" className="btn">
                  Сервисы
                </Link>
              </li>
            )}
            {roleId === '' ? (
              <li>
                <Link to="/login" className="btn">
                  Войти
                </Link>
              </li>
            ) : (
              <li>
                <div className="btn" onClick={hundleOutlog}>
                  Выйти
                </div>
                {/* <Link to="/login" className="btn" onClick={hundleOutlog}>
                  Выйти
                </Link> */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
