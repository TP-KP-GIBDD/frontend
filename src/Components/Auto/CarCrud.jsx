import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AUTO_API_URL } from '../../Api/Api';
import axios from 'axios';
import Loader from '../Loader';

export default function CarCrud() {
  const [cars, setCars] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (searchValue === '') {
      fetchCars();
    }
  }, [cars]);

  const handleSearchHange = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchCars = () => {
    const resp = axios.get(AUTO_API_URL + 'GetAvtos').then((response) => {
      setCars(response.data);
    });
  };

  const deleteCar = (id) => {
    const resp = axios
      .delete(AUTO_API_URL + `DeleteAvto/?id=${id}`)
      .then((response) => {});
  };

  const findById = () => {
    console.log(searchValue);

    if (searchValue === '') {
      fetchCars();
      return;
    }

    const resp = axios
      .get(AUTO_API_URL + `GetAvto?id=${searchValue}`)
      .then((response) => {
        let arr = [];
        arr.push(response.data);
        console.log(arr);
        setCars(arr);
        console.log(cars);
      });
  };

  return (
    <div>
      <div className="car-crud">
        <input
          class="crud-input"
          type="search"
          value={searchValue}
          onChange={handleSearchHange}
        />
        <button class="crud-search" onClick={() => findById()}>
          Search
        </button>
        <Link to="/CarRegistration">
          <button className="crud-add-btn">+</button>
        </Link>

        <div className="crud-nav">
          <div className="crud-navv">Гос. номер</div>
          <div className="crud-navv">VIN</div>
          <div className="crud-navv">Марка</div>
          <div className="crud-navv">Редактирование</div>
        </div>

        {cars.lenght !== 0 ? (
          <table className="crud-table">
            {cars.map((item) => (
              <tr>
                <td className="crud-td">{item.numberAvto}</td>
                <td className="crud-td">{item.vin}</td>
                <td className="crud-td">
                  {item.brandModel.brand.name + ' ' + item.brandModel.name}
                </td>
                <td>
                  <Link to={`/CarDetails/${item.id}`}>
                    <Button
                      className="profile-appointment"
                      type={'submit'}
                      variant="outlined"
                      // href={"/cardetails/" + item.id}
                      size="small"
                    >
                      Details
                    </Button>
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/CarUpdate/${item.id}?
                    cars=${cars}`}
                  >
                    <Button
                      className="profile-appointment"
                      type={'submit'}
                      variant="outlined"
                      size="small"
                      color="success"
                    >
                      Update
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    className="profile-appointment"
                    type={'submit'}
                    variant="outlined"
                    href=""
                    size="small"
                    color="error"
                    onClick={() => deleteCar(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
