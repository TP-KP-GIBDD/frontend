import React, { useState } from "react";

export default function CarDetails() {
  const [cars, setCars] = useState(
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
    }
  );
  return (
    <div>
      <span>
        <label>{cars.id}</label>
      </span>
    </div>
  );
}
