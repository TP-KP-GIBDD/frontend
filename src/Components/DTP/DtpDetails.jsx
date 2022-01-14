import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { DTP_API_URL, AUTH_API_URL, AUTO_API_URL } from '../../Api/Api';
export default function DtpDetails() {
  const queryParams = new URLSearchParams(window.location.search);
  const pageParams = useParams();

  const [dtp, setDtp] = useState();
  const [car, setCar] = useState({});
  const [carOwner, setCarOwner] = useState({});
  const [inspector, setInspector] = useState({});

  useEffect(() => {
    fetchData(pageParams.id);
  }, []);

  const fetchData = (id) => {
    console.log(queryParams.get('avtoId'));

    const resp = axios
      .get(DTP_API_URL + `GetProtocol?id=${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setDtp(resp.data);
      });

    axios
      .get(AUTO_API_URL + `GetAvto?id=${queryParams.get('avtoId')}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setCar(resp.data);
      })
      .catch((e) => alert(e));

    axios
      .get(AUTH_API_URL + `Accounts/${queryParams.get('personId')}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        setCarOwner(resp.data);
        console.log(resp.data);
      });

    axios
      .get(AUTH_API_URL + `Accounts/${queryParams.get('inspectorId')}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        setInspector(resp.data);
        console.log(resp.data);
      });
  };

  return (
    <div class="crud-details-table">
      <div class="crud-details-head">
        <div class="crud-details-head-text">№&nbsp;{} </div>
        <div class="crud-details-head-text-2">Информация о ДТП:</div>
      </div>

      <div class="crud-details-content">
        <div class="crud-details-content-left">
          <label>Адрес</label>
          <br />
          <label>Дата и время</label>
          <br />
          <label>Имя инспектора</label>
          <br />
          <label>Фамилия инспектора</label>
          <br />
          <label>Тип нарушения</label>
          <br />
          <label>Описание нарушения</label>
          <br />
          <label>Регулирование перекрёстка</label>
          <br />
          <label>Дорожная разметка</label>
          <br />
          <label>Дорожные знаки</label>
          <br />
          <label>Тип освещения</label>
        </div>
        <div class="crud-details-content-right">
          <span>{dtp?.address}</span>
          <br />
          <span>{new Date(dtp?.dateTime).toLocaleDateString()}</span>
          <br />
          <span>{inspector?.firstName}</span>
          <br />
          <span>{inspector?.lastName}</span>

          <br />
          <span>{dtp?.typeViolation?.name}</span>
          <br />

          <span>{dtp?.violation}</span>
          <br />

          <span>{dtp?.placeViolation?.methodTrafficRegulation}</span>
          <br />

          <span>{dtp?.placeViolation?.roadMarkup}</span>
          <br />

          <span>{dtp?.placeViolation?.roadSigns}</span>
          <br />

          <span>{dtp?.placeViolation?.typeLighting}</span>
        </div>
      </div>
      <br />
      <div>УЧАСТНИК ДТП:</div>
      <div class="crud-details-content">
        <div class="crud-details-content-left">
          <label>Фамилия</label>
          <br />
          <label>Имя</label>
          <br />
          <label>Отчество</label>
          <br />
          <label>Статус</label>
        </div>
        <div class="crud-details-content-right">
          <span>{carOwner?.lastName}</span>
          <br />
          <span>{carOwner?.firstName}</span>
          <br />
          <span>{carOwner?.middleName}</span>
          <br />
          <span>{dtp?.participants?.status}</span>
        </div>
      </div>
      <br />
      <div>АВТОМОБИЛЬ:</div>
      <div class="crud-details-content">
        <div class="crud-details-content-left">
          <label>Марка</label>
          <br />
          <label>Гос. номер</label>
          <br />
          <label>Повреждения</label>
        </div>
        <div class="crud-details-content-right">
          <span>
            {car?.brandModel?.brand?.name + ' ' + car?.brandModel?.name}
          </span>
          <br />
          <span>{car?.numberAvto}</span>
          <br />
          <span>{dtp?.damage}</span>
        </div>
      </div>

      <Link to="/dtp">
        <Button>Назад</Button>
      </Link>
    </div>
  );
}
