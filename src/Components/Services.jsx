import React from "react";
import Car from "../Assets/Car.png";
import CalendarPlus from "../Assets/CalendarPlus.png";
import Driver from "../Assets/Driver.png";
import Law from "../Assets/Law.png";

export default function Services() {
  return (
    <div>
      <div>
        <h1 className="online-service">Онлайн-сервисы</h1>
      </div>
      <div className="service-container">
        <div className="service-item">
          <img src={Law} />
          <p className="service-item-text">Проверка штрафов</p>
        </div>
        <div className="service-item">
          <img src={Car} />
          <p className="service-item-text">Проверка автомобиля</p>
        </div>
        <div className="service-item">
          <img src={Driver} />
          <p className="service-item-text">Проверка водителя</p>
        </div>
        <div className="service-item">
          <img src={CalendarPlus} />
          <p className="service-item-text">Запись на услугу</p>
        </div>
      </div>
    </div>
  );
}
