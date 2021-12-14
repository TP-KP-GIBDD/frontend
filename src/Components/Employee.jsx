import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Employee() {
  return (
    <div>
      <h2 class="profile-head">Записи на приём</h2>
      <div className="employee-head">
        <Button variant="outlined" size="small">
          Посмотреть все записи
        </Button>
      </div>
      <h2 class="profile-head">Автомобиль</h2>
      <div className="employee-head">
        <Link to="/CarCrud">
          <Button className="car-btn" variant="outlined" size="small">
            Все автомобили
          </Button>
        </Link>
        <Link to="/CarRegistration">
          <Button className="car-btn" variant="outlined" size="small">
            Зарегистрировать автомобиль
          </Button>
        </Link>
      </div>
      <h2 class="profile-head">Штрафы</h2>
      <div className="employee-head">
        <Button className="car-btn" variant="outlined" size="small">
          Добавить
        </Button>
        <Button className="car-btn" variant="outlined" size="small">
          Оплачен
        </Button>
      </div>
    </div>
  );
}
