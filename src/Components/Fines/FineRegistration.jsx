import React, { useState, useEffect } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import DropDownList from '../AppointServiceForm/DropDownList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTO_API_URL, FINE_API_URL } from '../../Api/Api';

export default function FineRegistration() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    typeFineId: null,
    personId: null,
    avtoId: null,
    sumaryFine: null,
    statusFine: 'Не оплачен',
  });

  const handleTypeChange = (e) => {
    setInputValue({ ...inputValue, typeFineId: e.target.value });
  };

  const handleChange = (e) => {
    console.log(inputValue);
    switch (e.target.name) {
      case 'personId':
        setInputValue({ ...inputValue, personId: e.target.value });
        break;
      case 'avtoId':
        setInputValue({ ...inputValue, avtoId: e.target.value });
        break;
      case 'sumaryFine':
        setInputValue({ ...inputValue, sumaryFine: e.target.value });
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
        FINE_API_URL +
          `CreateFine?TypeFineId=${inputValue.typeFineId}
            &PersonId=${Number(inputValue.personId)}
            &AvtoId=${Number(inputValue.avtoId)}
            &SumaryFine=${Number(inputValue.sumaryFine)}
            &StatusFine=${inputValue.statusFine}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      )
      .then((resp) => {});
    navigate('/fines');
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
              label="ID нарушителя"
              id="outlined-size-small"
              name="personId"
              value={inputValue.personId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="ID автомобиля"
              id="outlined-size-small"
              name="avtoId"
              value={inputValue.avtoId}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />

          <DropDownList
            items={types}
            title="Тип нарушения"
            name="model"
            value={inputValue.typeFineId}
            onChange={handleTypeChange}
          />

          <span>
            <TextField
              className="personal-data-text-field"
              label="Сумма штрафа"
              id="outlined-size-small"
              name="sumaryFine"
              value={inputValue.sumaryFine}
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
