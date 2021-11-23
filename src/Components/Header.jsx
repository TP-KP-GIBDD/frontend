import React from "react";

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
              <a href="#" className="btn"></a>Главная
            </li>
            <li>
              <a href="#" className="btn"></a>Контакты
            </li>
            <li>
              <a href="#" className="btn"></a>Сервисы
            </li>
            <li>
              <a href="#" className="btn"></a>Войти
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
