import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CarCrud() {
  const [cars, setCars] = useState([
    {
      id: 1,
      stateNumber: "А423РХ33",
      vinNumber: "XTA210990Y2766389",
      brand: "Toyota",
      model: "Mark II",
      releaseDate: "1990",
      power: "204",
      color: "Черный",
      bodytype: "Седан",
      steeringWheel: "Правый",
    },
    {
      id: 2,
      stateNumber: "А999АА33",
      vinNumber: "XTA210990Y2765478",
      brand: "Nissan",
      model: "Silvia",
      releaseDate: "1987",
      power: "247",
      color: "Синий",
      bodytype: "Седан",
      steeringWheel: "Правый",
    },
  ]);

  return (
    <div>
      <div className="car-crud">
        <input class="crud-input" type="search"></input>
        <button class="crud-search">Search</button>
        <Link to="/CarRegistration">
          <button className="crud-add-btn">+</button>
        </Link>

        <div className="crud-nav">
          <div className="crud-navv">Гос. номер</div>
          <div className="crud-navv">VIN</div>
          <div className="crud-navv">Марка</div>
          <div className="crud-navv">Редактирование</div>
        </div>

        <table className="crud-table">
          {cars.map((item) => (
            <tr>
              <td className="crud-td">{item.stateNumber}</td>
              <td className="crud-td">{item.vinNumber}</td>
              <td className="crud-td">{item.brand}</td>
              <td>
                <Link to={`/CarDetails/${item.id}`}>
                  <Button
                    className="profile-appointment"
                    type={"submit"}
                    variant="outlined"
                    // href={"/cardetails/" + item.id}
                    size="small"
                  >
                    Details
                  </Button>
                </Link>
              </td>
              <td>
                <Link to={`/CarUpdate/${item.id}`}>
                  <Button
                    className="profile-appointment"
                    type={"submit"}
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
                  type={"submit"}
                  variant="outlined"
                  href=""
                  size="small"
                  color="error"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
