import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FINE_API_URL, AUTH_API_URL, AUTO_API_URL } from '../../Api/Api';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FineDetails() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);

  const [fine, setFine] = useState({
    id: 0,
  });

  const [car, setCar] = useState({});
  const [carOwner, setCarOwner] = useState({});

  const pageParams = useParams();

  useEffect(() => {
    fetchData(pageParams.id);
  }, []);

  const fetchData = (id) => {
    console.log(queryParams.get('avtoId'));
    axios
      .get(FINE_API_URL + `GetFine?id=${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        setFine(resp.data);
      })
      .catch((e) => alert(e));

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
  };

  const payFine = () => {
    axios
      .post(FINE_API_URL + `PayFine?fineId=${pageParams.id}`)
      .then((resp) => {
        navigate('/Fines');
      })
      .catch((e) => alert(e));
  };

  return (
    <div class="crud-details-table">
      <div class="crud-details-head">
        <div class="crud-details-head-text">№&nbsp;{} </div>
        <div class="crud-details-head-text-2">Информация о штрафе:</div>
      </div>

      <div class="crud-details-content">
        <div class="crud-details-content-left">
          <label>Тип штрафа</label>
          <br />
          <label>Статья ПДД</label>
          <br />
          <label>Статус оплаты</label>
          <br />
          <label>Сумма</label>
          <br />
          <label>Номер авто</label>
          <br />
          <label>Марка авто</label>
          <br />
          <label>Имя</label>
          <br />
          <label>Фамилия</label>
          <br />
          <label>Отчество</label>
          <br />
          <label>Дата рождения</label>
          <br />
          <label>Дата и время</label>
        </div>
        <div class="crud-details-content-right">
          <span>{fine.typeFine?.name}</span>
          <br />
          <span>{fine.typeFine?.article}</span>
          <br />
          <span>{fine.statusFine}</span>
          <br />
          <span>{fine.sumaryFine}</span>
          <br />
          <span>{car.numberAvto}</span>
          <br />
          <span>
            {car.brandModel?.brand?.name + ' '}
            {car.brandModel?.name}
          </span>
          <br />
          <span>{carOwner.firstName}</span>
          <br />
          <span>{carOwner.lastName}</span>
          <br />
          <span>{carOwner.middleName}</span>
          <br />
          <span>{carOwner.birthday}</span>
          <br />
          <span>Дата и время</span>
        </div>
      </div>
      <Link to="/fines">
        <Button>Назад</Button>
      </Link>
      <Link to="">
        <Button color="success" onClick={() => payFine()}>
          Оплатить
        </Button>
      </Link>
    </div>
  );
}
