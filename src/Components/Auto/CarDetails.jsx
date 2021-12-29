import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function CarDetails() {
  const [cars, setCars] = useState(
    {
      id: 1,
      stateNumber: 'А423РХ33',
      vinNumber: 'XTA210990Y2766389',
      brand: 'Toyota',
      model: 'Mark II',
      releaseDate: '1990',
      power: '204',
      color: 'Черный',
      bodytype: 'Седан',
      steeringWheel: 'Правый',
    },
    {
      id: 2,
      stateNumber: 'А999АА33',
      vinNumber: 'XTA210990Y2765478',
      brand: 'Nissan',
      model: 'Silvia',
      releaseDate: '1987',
      power: '247',
      color: 'Синий',
      bodytype: 'Седан',
      steeringWheel: 'Правый',
    }
  );

  const pageParams = useParams();

  useEffect(() => {
    console.log(pageParams);
  }, []);

  return (
    <div>
      <div class="crud-details-table">
        <div class="crud-details-head">
          <div class="crud-details-head-text">№&nbsp;{pageParams.id} </div>
          <div class="crud-details-head-text-2">
            Информация о данном автомобиле:
          </div>
        </div>
        <div class="crud-details-content">
          <div class="crud-details-content-left">
            <label>Гос. номер</label>
            <br />
            <label>VIN</label>
            <br />
            <label>Марка</label>
            <br />
            <label>Модель</label>
            <br />
            <label>Год выпуска</label>
            <br />
            <label>Мощность</label>
            <br />
            <label>Цвет</label>
            <br />
            <label>Тип кузова</label>
            <br />
            <label>Руль</label>
          </div>
          <div class="crud-details-content-right">
            <span>{cars.stateNumber}</span>
            <br />
            <span>{cars.vinNumber}</span>
            <br />
            <span>{cars.brand}</span>
            <br />
            <span>{cars.model}</span>
            <br />
            <span>{cars.releaseDate}</span>
            <br />
            <span>{cars.power}</span>
            <br />
            <span>{cars.color}</span>
            <br />
            <span>{cars.bodytype}</span>
            <br />
            <span>{cars.steeringWheel}</span>
          </div>
        </div>
        <Link to="/carcrud">
          <Button>Назад</Button>
        </Link>
      </div>
    </div>
  );
}
