import React from 'react';
import Button from '@mui/material/Button';

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
        <Button className="car-btn" variant="outlined" size="small">
          Изменить автомобиль
        </Button>
        <Button className="car-btn" variant="outlined" size="small">
          Зарегистрировать автомобиль
        </Button>
        <Button className="car-btn" variant="outlined" size="small">
          Удалить автомобиль
        </Button>
      </div>
      <h2 class="profile-head">Штрафы</h2>
    </div>
  );
}
