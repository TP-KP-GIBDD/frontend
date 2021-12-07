import React, { useContext } from 'react';
import UserContext from '../Context';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

export default function ProfileUpdate() {
  const { inputValue } = useContext(UserContext);
  return (
    <div>
      <h1 className="profile-heading">Editing</h1>
      <div>
        <h2 class="profile-head">Личные данные</h2>

        <div>
          <div className="personal-data">
            <div>
              <span>
                <TextField
                  className="personal-data-text-field"
                  label="Имя"
                  id="outlined-size-small"
                  defaultValue={inputValue.name}
                  size="small"
                />
              </span>
              <br />
              <span>
                <TextField
                  className="personal-data-text-field"
                  label="Фамилия"
                  id="outlined-size-small"
                  defaultValue={inputValue.secondName}
                  size="small"
                />
              </span>
              <br />
              <span>
                <TextField
                  className="personal-data-text-field"
                  label="Отчество"
                  id="outlined-size-small"
                  defaultValue={inputValue.middleName}
                  size="small"
                />
              </span>
              <br />
              <span>
                <TextField
                  className="personal-data-text-field"
                  label="Дата рождения"
                  id="outlined-size-small"
                  defaultValue={inputValue.dateBirth}
                  size="small"
                />
              </span>
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
                value="female"
                control={<Radio />}
                label="Мужской"
              />
              <FormControlLabel
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
            <div>
              <span>
                <TextField
                  className="personal-data-text-field"
                  label="Телефон"
                  id="outlined-size-small"
                  defaultValue={inputValue.phone}
                  size="small"
                />
              </span>
              <br />
              <span>
                <TextField
                  className="personal-data-text-field"
                  label="Почта"
                  id="outlined-size-small"
                  defaultValue={inputValue.email}
                  size="small"
                />
              </span>
            </div>
          </div>
        </div>
        <h2 class="profile-head">Документы</h2>
        <div>
          <div className="personal-data">
            <div>
              <div>
                <span>
                  <TextField
                    className="personal-data-text-field"
                    label="СНИЛС"
                    id="outlined-size-small"
                    defaultValue={inputValue.snils}
                    size="small"
                  />
                </span>
                <br />
                <span>
                  <TextField
                    className="personal-data-text-field"
                    label="ИНН"
                    id="outlined-size-small"
                    defaultValue={inputValue.inn}
                    size="small"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <Link to="/Profile">
          <Button
            className={'registration-button'}
            type={'submit'}
            variant="contained"
            href="/Profile"
          >
            Назад
          </Button>
        </Link>
        <br />

        <Button
          className={'registration-button'}
          type={'submit'}
          variant="contained"
          color="success"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}
