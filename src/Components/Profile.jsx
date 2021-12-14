import React, { useContext } from 'react';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import UserContext from '../Context';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link } from 'react-router-dom';
import Loader from './Loader';

export default function Profile() {
  const { inputValue } = useContext(UserContext);

  return (
    <div>
      <h1 className="profile-heading">Your profile</h1>
      <div>
        <Avatar className="ProfileAvatar" src="/broken-image.jpg" />
      </div>
      <div>
        <h2 class="profile-head">Личные данные</h2>

        <div>
          <div className="personal-data">
            <div className="personal-data-left">
              <label>Имя:</label>
              <br />
              <label>Фамилия:</label>
              <br />
              <label>Отчество:</label>
              <br />
              <label>Дата рождения:</label>
            </div>
            <div>
              <span>{inputValue.name}</span>
              <br />
              <span>{inputValue.secondName}</span>
              <br />
              <span>{inputValue.middleName}</span>
              <br />
              <span>{inputValue.dateBirth}</span>
            </div>
          </div>

          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Пол</FormLabel>
            <RadioGroup
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                disabled
                value="female"
                control={<Radio />}
                label="Мужской"
              />
              <FormControlLabel
                disabled
                value="male"
                control={<Radio />}
                label="Женский"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <h2 class="profile-head">Контакты</h2>
        <div>
          <div className="personal-data">
            <div className="personal-data-left">
              <label>Телефон:</label>
              <br />
              <label>Email:</label>
            </div>
            <div>
              <span>{inputValue.phone}</span>
              <br />
              <span>{inputValue.email}</span>
            </div>
          </div>
        </div>
        <h2 class="profile-head">Документы</h2>
        <div>
          <div className="personal-data">
            <div className="personal-data-left">
              <label>СНИЛС:</label>
              <br />
              <label>ИНН:</label>
            </div>
            <div>
              <span>{inputValue.snils}</span>
              <br />
              <span>{inputValue.inn}</span>
            </div>
          </div>
        </div>

        <Link to="/ProfileUpdate">
          <Button
            type={'submit'}
            variant="contained"
            // href="/ProfileUpdate"
            size="small"
          >
            Изменить данные
          </Button>
        </Link>
        <h2 class="profile-head">Записи</h2>
        <Link to="/AppointServiceList">
          <Button type={'submit'} variant="contained" size="small">
            Мои заявки
          </Button>
        </Link>
      </div>
    </div>
  );
}
