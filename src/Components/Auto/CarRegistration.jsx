import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CarRegistration() {
  return (
    <div>
      <Link to="/employee">
        <button> Сотруднику </button>
      </Link>
      <div className="personal-data">
        <div className="personal-data-left">
          <label>Гос. знак:</label>
          <br />
          <label>VIN номер:</label>
          <br />
          <label>Марка:</label>
          <br />
          <label>Модель:</label>
          <br />
          <label>Год:</label>
          <br />
          <label>Мощность:</label>
          <br />
          <label>Цвет:</label>
          <br />
          <label>Тип кузова:</label>
          <br />
          <label>Руль:</label>
        </div>
        <div>
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
          <br />
          <span>
            <input></input>
          </span>
        </div>
      </div>
      <Link to="/CarCrud">
        <Button
          className="profile-appointment"
          variant="outlined"
          color="error"
          size="small"
        >
          Отмена
        </Button>
      </Link>
      <Button
        className="profile-appointment"
        type={"submit"}
        variant="outlined"
        href=""
        size="small"
      >
        Зарегестрировать автомобиль
      </Button>
    </div>
  );
}
