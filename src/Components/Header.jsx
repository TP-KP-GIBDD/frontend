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
import { Link } from 'react-router-dom';

export default function Header() {
  const { roleId } = useContext(UserContext);
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">ГОСАВТОИНСПЕКЦИЯ</h1>
      </div>
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
          {roleId === 0 && (
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
            {roleId === 0 && (
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
            <li>
              <Link to="/services" className="btn">
                Сервисы
              </Link>
            </li>
            {roleId !== 0 ? (
              <li>
                <Link to="/login" className="btn">
                  Войти
                </Link>
              </li>
            ) : (
              <li>
                <Link to="#" className="btn">
                  Выйти
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
