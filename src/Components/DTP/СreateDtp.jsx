import React, { useState, useEffect } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import DropDownList from '../AppointServiceForm/DropDownList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DTP_API_URL, FINE_API_URL } from '../../Api/Api';

export default function CreateDtp() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    address: null,
    inspectorId: null,
    accountId: 1,
    placeViolationId: null,
    typeViolationId: null,
    participantsId: null,
    avtoId: null,
    damage: null,
    violation: null,
    typeLightning: null,
    roadSigns: null,
    methodTrafficRegulation: null,
    roadMarkup: null,
  });

  const handleChange = (e) => {
    console.log(inputValue);
    switch (e.target.name) {
      case 'address':
        setInputValue({ ...inputValue, address: e.target.value });
        break;
      case 'inspectorId':
        setInputValue({ ...inputValue, inspectorId: e.target.value });
        break;
      case 'accountId':
        setInputValue({ ...inputValue, accountId: e.target.value });
        break;
      case 'placeViolationId':
        setInputValue({ ...inputValue, placeViolationId: e.target.value });
        break;
      case 'participantsId':
        setInputValue({ ...inputValue, participantsId: e.target.value });
        break;
      case 'avtoId':
        setInputValue({ ...inputValue, avtoId: e.target.value });
        break;
      case 'damage':
        setInputValue({ ...inputValue, damage: e.target.value });
        break;
      case 'violation':
        setInputValue({ ...inputValue, violation: e.target.value });
        break;
      case 'typeLightning':
        setInputValue({ ...inputValue, typeLightning: e.target.value });
        break;
      case 'roadSigns':
        setInputValue({ ...inputValue, roadSigns: e.target.value });
        break;
      case 'methodTrafficRegulation':
        setInputValue({
          ...inputValue,
          methodTrafficRegulation: e.target.value,
        });
        break;
      case 'roadMarkup':
        setInputValue({ ...inputValue, roadMarkup: e.target.value });
        break;
      case 'typeViolationId':
        setInputValue({ ...inputValue, typeViolationId: e.target.value });
        break;
    }
  };

  const [types, setTypes] = useState([]);

  const fetchTypes = () => {
    axios
      .get(FINE_API_URL + `GetTypeFines`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => setTypes(resp.data))
      .catch((e) => alert(e));
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const submit = () => {
    axios
      .post(
        DTP_API_URL + 'CreateProtocol',
        {
          typeLighting: inputValue.typeLightning,

          roadSigns: inputValue.roadSigns,
          methodTrafficRegulation: inputValue.methodTrafficRegulation,
          roadMarkup: inputValue.roadMarkup,
          accountId: Number(5),
          typeViolationId: Number(inputValue.typeViolationId),
          address: inputValue.address,
          dateTime: inputValue.dateTime,
          inspectorId: Number(inputValue.typeViolationId),
          avtoId: Number(inputValue.typeViolationId),
          damage: inputValue.damage,
          violation: inputValue.violation,
          status: 'В рассмотрении',
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      )
      .then((resp) => {
        if (resp.code === 200) {
          navigate('/dtp');
        }
      });
  };

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
              label="Тип освещения"
              id="outlined-size-small"
              name="typeLightning"
              value={inputValue.typeLightning}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Дорожные знаки"
              id="outlined-size-small"
              name="roadSigns"
              value={inputValue.roadSigns}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Метод регулирования перекрёстка"
              id="outlined-size-small"
              name="methodTrafficRegulation"
              value={inputValue.methodTrafficRegulation}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Дорожная разметка"
              id="outlined-size-small"
              name="roadMarkup"
              value={inputValue.roadMarkup}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Адрес"
              id="outlined-size-small"
              name="address"
              value={inputValue.address}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="ID инспектора"
              id="outlined-size-small"
              name="inspectorId"
              value={inputValue.inspectorId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="ID участника"
              id="outlined-size-small"
              name="accountId"
              value={inputValue.accountId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />

          {/* <DropDownList
            items={types}
            title="Тип нарушения"
            name="model"
            value={inputValue.typeFineId}
            onChange={handleTypeChange}
          /> */}

          <span>
            <TextField
              className="personal-data-text-field"
              label="id местности"
              id="outlined-size-small"
              name="placeViolationId"
              value={inputValue.placeViolationId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />

          <span>
            <TextField
              className="personal-data-text-field"
              label="Тип ДТП"
              id="outlined-size-small"
              name="typeViolationId"
              value={inputValue.typeViolationId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="participantsId"
              id="outlined-size-small"
              name="participantsId"
              value={inputValue.participantsId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="id автомобиля"
              id="outlined-size-small"
              name="avtoId"
              value={inputValue.avtoId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Повреждения"
              id="outlined-size-small"
              name="damage"
              value={inputValue.damage}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Нарушение"
              id="outlined-size-small"
              name="violation"
              value={inputValue.violation}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
        </div>
      </div>
      <Button
        sx={{ marginTop: 1, width: 300 }}
        className="profile-appointment"
        type={'submit'}
        variant="outlined"
        href=""
        size="small"
        onClick={submit}
      >
        Добавить
      </Button>
    </div>
  );
}
