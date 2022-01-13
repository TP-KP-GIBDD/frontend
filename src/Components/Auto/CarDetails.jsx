import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { AUTO_API_URL, AUTH_API_URL } from '../../Api/Api';
import Loader from '../Loader';

export default function CarDetails() {
  const [car, setCar] = useState({});

  const pageParams = useParams();

  const fetchData = () => {
    axios
      .get(AUTO_API_URL + `GetAvto?id=${pageParams.id}`)
      .then((resp) => {
        setCar(resp.data);
      })
      .catch((e) => alert(e));
  };

  const [countCarOwners, setCountCarOwners] = useState();

  const [carOwnerArr, setCarOwnerArr] = useState([]);

  const fetchAllCarOwners = () => {
    let test = axios
      .get(AUTO_API_URL + `GetCarOwnerByAvtoId?id=${pageParams.id}`)
      .then((resp) => {
        // setCarOwners(resp.data);
        return resp.data;
      })
      .catch((e) => alert(e));

    test.then((data) => setCountCarOwners(data.length));
    test.then((data) => setCarOwnerArr(data));
  };

  const [carOwnersInfo, setCarOwnersInfo] = useState(null);

  const fetchCarOwnersInfo = (carOwnersArr) => {
    let arr = [];

    carOwnersArr.forEach((item) => {
      let test = axios
        .get(AUTH_API_URL + `Accounts/${item.personId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((resp) => {
          return resp.data;
        });
      test.then((data) => {
        let car = {
          lastName: data.lastName,
          firstName: data.firstName,
          middleName: data.middleName,
          birthday: data.birthday,
          registrationDate: new Date(item.registrationDate).getTime(),
        };
        arr.push(car);
      });
    });

    setTimeout(() => {
      setCarOwnersInfo(arr);
    }, 300);
  };

  useEffect(() => {
    fetchData();
    fetchAllCarOwners();
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

        {!(Object.keys(car).length === 0 && car.constructor === Object) ? (
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
              <span>{car.numberAvto}</span>
              <br />
              <span>{car.vin}</span>
              <br />
              <span>{car.brandModel.brand.name}</span>
              <br />
              <span>{car.brandModel.name}</span>
              <br />
              <span>{car.year}</span>
              <br />
              <span>{car.power}</span>
              <br />
              <span>{car.color.name}</span>
              <br />
              <span>{car.bodyType.name}</span>
              <br />
              <span>{car.rudder.name}</span>
            </div>

            <div>
              <div>Количество владельцев: {countCarOwners}</div>
              <Button onClick={() => fetchCarOwnersInfo(carOwnerArr)}>
                Показать всех
              </Button>

              {carOwnersInfo !== null &&
                carOwnersInfo.map((item) => (
                  <>
                    <div>Фамилия: {item.lastName}</div>
                    <div>Имя: {item.firstName}</div>
                    <div>Отчество: {item.middleName}</div>
                    <div>Дата рождения: {item.birthday}</div>
                    <div>
                      Дата регистрации авто:{' '}
                      {new Date(item.registrationDate).toLocaleDateString()}
                    </div>
                    <br />
                  </>
                ))}
            </div>
          </div>
        ) : (
          <Loader />
        )}

        <Link to="/carcrud">
          <Button>Назад</Button>
        </Link>
      </div>
    </div>
  );
}
