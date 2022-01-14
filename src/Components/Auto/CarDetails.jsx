import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import {
  AUTO_API_URL,
  AUTH_API_URL,
  FINE_API_URL,
  DTP_API_URL,
} from '../../Api/Api';
import Loader from '../Loader';

export default function CarDetails() {
  const [car, setCar] = useState({});

  const pageParams = useParams();

  const fetchData = () => {
    axios
      .get(AUTO_API_URL + `GetAvto?id=${pageParams.id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        setCar(resp.data);
      })
      .catch((e) => alert(e));
  };

  const [countCarOwners, setCountCarOwners] = useState();

  const [carOwnerArr, setCarOwnerArr] = useState([]);

  const fetchAllCarOwners = () => {
    let test = axios
      .get(AUTO_API_URL + `GetCarOwnerByAvtoId?id=${pageParams.id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
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
          registrationDate: item.registrationDate,
        };
        arr.push(car);
      });

      console.log(carOwnersInfo);
    });

    setTimeout(() => {
      setCarOwnersInfo(arr);
    }, 300);
  };

  useEffect(() => {
    fetchData();
    fetchAllCarOwners();
  }, []);

  const [countFines, setCountFines] = useState(null);
  const [carFines, setCarFines] = useState([]);
  const [totalSumary, setTotalSumary] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const fetchFines = (carId) => {
    axios
      .get(FINE_API_URL + `GetFineByAvtoId?id=${carId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        let result = resp.data;

        let total = 0;
        result.forEach((item) => (total += item.sumaryFine));
        setTotalSumary(total);

        setIsShow(true);
        setCarFines(resp.data);
        setCountFines(resp.data.length);
      })
      .catch((e) => alert(e));
  };

  const [dtpList, setDtpList] = useState([]);
  const [countDtp, setCountDtp] = useState([]);
  const [isDtpShow, setIsDtpShow] = useState(false);

  const fetchDtp = (carId) => {
    axios
      .get(DTP_API_URL + `GetProtocolByAvto?AvtoId=${carId}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        setDtpList(resp.data);
        setIsDtpShow(true);
        setCountDtp(resp.data.lenght);
      });
  };

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
              <br />
              <label>Количество владельцев: </label>
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
              <br />
              <span>
                {countCarOwners}
                <Button onClick={() => fetchCarOwnersInfo(carOwnerArr)}>
                  Показать всех
                </Button>
              </span>
            </div>
            <br />
            <div></div>
          </div>
        ) : (
          <Loader />
        )}
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

        <Button onClick={() => fetchFines(car.id)}>Проверить на штрафы</Button>
        {isShow === true && (
          <div>
            <label>Количество неоплаченных штрафов: {countFines}</label>
            <br />
            <label>Общая сумма неоплаченных штрафов: {totalSumary}</label>
            <br />
            <br />
          </div>
        )}
        {countCarOwners !== null && (
          <div>
            {carFines.map((item) => {
              return (
                <>
                  {console.log(item)}
                  <div>Статья ПДД: {item.typeFine?.article}</div>
                  <div>Описание: {item.typeFine?.name}</div>
                  <div>Сумма: {item.sumaryFine}</div>

                  <br />
                </>
              );
            })}
          </div>
        )}
        <Button onClick={() => fetchDtp(car.id)}>Проверить на ДТП</Button>
        {isDtpShow === true && (
          <div>
            <label>Найдено {countFines} ДТП</label>
          </div>
        )}
        {dtpList !== null &&
          dtpList?.map((item) => (
            <>
              <div>Дата: {new Date(item.dateTime).toLocaleDateString()}</div>
              <div>Тип нарушения: {item.typeViolation?.name}</div>
              <div>Повреждения: {item.danger}</div>

              <br />
            </>
          ))}

        <br />
        <Link to="/carcrud">
          <Button>Назад</Button>
        </Link>
      </div>
    </div>
  );
}
