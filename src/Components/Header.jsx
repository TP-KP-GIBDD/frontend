import {
  AppBar,
  appBarClasses,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import React from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">ГОСАВТОИНСПЕКЦИЯ</h1>
      </div>
      <div className="header-right">
        <div className="header-nav">
          <ul>
            <li>
              <a href="/home" className="btn">
                Главная
              </a>
            </li>
            <li>
              <a href="/contacts" className="btn">
                Контакты
              </a>
            </li>
            <li>
              <a href="/services" className="btn">
                Сервисы
              </a>
            </li>
            <li>
              <a href="/login" className="btn">
                Войти
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
