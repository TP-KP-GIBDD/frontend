import React from 'react';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import DropDownList from '../AppointServiceForm/DropDownList';

export default function CarRegistration() {
  const [inputValues, setInputValues] = useState({
    number_avto: null,
    vin: null,
    brand: null,
    model: null,
    year: null,
    power: null,
    color: null,
    body_type_id: null,
    rudder_id: null,
  });

  const [brands, setBrand] = useState(['']);
  const [models, setModel] = useState(['']);

  const [colors, serColor] = useState(['']);
  const [body_type_ids, setBody_type_id] = useState(['']);
  const [rudder_ids, setRudder_id] = useState(['']);

  return (
    <div>
      <Link to="/employee">
        <Button type={'submit'} size="small">
          Сотруднику
        </Button>
      </Link>
      <div className="personal-data">
        <div>
          <span>
            <TextField
              className="personal-data-text-field"
              label="Гос. Знак"
              id="outlined-size-small"
              defaultValue={inputValues.number_avto}
              size="small"
              sx={{ width: 300, height: 40 }}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="VIN Номер"
              id="outlined-size-small"
              defaultValue={inputValues.vin}
              size="small"
              sx={{ width: 300, marginBottom: 2 }}
            />
          </span>
          <br />

          <DropDownList
            items={brands}
            title="Марка"
            value={inputValues.brand}
            size="small"
            // onChange={handleChangeService}
          />

          <br />

          <DropDownList
            items={models}
            title="Модель"
            value={inputValues.model}
            // onChange={handleChangeService}
          />

          <span>
            <TextField
              className="personal-data-text-field"
              label="Год"
              id="outlined-size-small"
              defaultValue={inputValues.year}
              size="small"
              sx={{ width: 300 }}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Мощность"
              id="outlined-size-small"
              defaultValue={inputValues.power}
              size="small"
              sx={{ width: 300, marginBottom: 2 }}
            />
          </span>

          <span>
            <DropDownList
              items={colors}
              title="Цвет"
              value={inputValues.color}
              // onChange={handleChangeService}
            />
          </span>
          <br />
          <span>
            <DropDownList
              items={body_type_ids}
              title="Тип кузова"
              value={inputValues.body_type_id}
              // onChange={handleChangeService}
            />
          </span>
          <br />
          <span>
            <DropDownList
              items={rudder_ids}
              title="Руль"
              value={inputValues.rudder_id}
              // onChange={handleChangeService}
            />
          </span>
        </div>
      </div>

      <Button
        sx={{ marginTop: 1, width: 300 }}
        className="profile-appointment"
        type={'submit'}
        variant="outlined"
        href=""
        size="small"
      >
        Зарегестрировать автомобиль
      </Button>
      <br />
      <Link to="/CarCrud">
        <Button
          sx={{ marginTop: 1, width: 300 }}
          className="profile-appointment"
          variant="outlined"
          color="error"
          size="small"
        >
          Отмена
        </Button>
      </Link>
    </div>
  );
}
