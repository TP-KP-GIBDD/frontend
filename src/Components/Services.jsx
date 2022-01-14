import React from 'react';
import Car from '../Assets/Car.png';
import CalendarPlus from '../Assets/CalendarPlus.png';
import Law from '../Assets/Law.png';
import dtp from '../Assets/dtp.png';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div>
      <div>
        <h1 className="online-service">Онлайн-сервисы</h1>
      </div>
      <div className="service-container">
        <Link to="/fineCheck">
          <div className="service-item">
            <img src={Law} />
            <p className="service-item-text">Проверка штрафов</p>
          </div>
        </Link>
        <Link to="/carCheck">
          <div className="service-item">
            <img src={Car} />
            <p className="service-item-text">Проверка автомобиля</p>
          </div>
        </Link>
        <div className="service-item">
          <img src={dtp} />
          <p className="service-item-text">ДТП</p>
        </div>
        <Link to="/registrationAppoint">
          <div className="service-item">
            <img src={CalendarPlus} />
            <p className="service-item-text">Запись на услугу</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
