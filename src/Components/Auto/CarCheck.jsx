import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { AUTO_API_URL } from '../../Api/Api';
import { useNavigate } from 'react-router-dom';

export default function CarCheck() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .get(AUTO_API_URL + `GetByNumberAvto?numberAvto=${inputValue}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          navigate('/CarDetails/' + inputValue);
        } else {
          setError('Автомобиль с данным номером не найден');
        }
      })
      .catch((e) => alert(e));
  };

  return (
    <div>
      <TextField
        className="personal-data-text-field"
        label="Номер автомобиля"
        id="outlined-size-small"
        name="stateNumber"
        defaultValue={inputValue}
        size="small"
        sx={{ width: 300, height: 40 }}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        style={{ marginTop: 23, marginLeft: 15 }}
        onClick={() => handleSubmit()}
      >
        Найти
      </Button>

      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
}
