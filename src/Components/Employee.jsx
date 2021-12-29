import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Employee() {
  return (
    <div>
      <h2 class="profile-head">Записи на приём</h2>
      <div className="employee-head">
        <Link to="/EmployeeAppointServiceList">
          <Button variant="outlined" size="small">
            Посмотреть все записи
          </Button>
        </Link>
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
        <Link to="/fines">
          <Button className="car-btn" variant="outlined" size="small">
            Все штрафы
          </Button>
        </Link>
      </div>
      <h2 class="profile-head">ДТП</h2>
      <div className="employee-head">
        <Link to="#">
          <Button className="car-btn" variant="outlined" size="small">
            ДТП
          </Button>
        </Link>
      </div>
    </div>
  );
}
