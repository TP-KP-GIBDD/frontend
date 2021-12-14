import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AppointDetails() {
  const [appoint, setAppoint] = useState({
    id: 1,
    name: 'Получение водительского удостоверения',
    date: '14.12.2021',
    time: '14:00',
    status: 'Ожидает выполнения',
    region: 'Владимирская область',
    gidbbOffice: 'УМВД по Владимирской области',
    documents: [
      'Договор купли-продажи',
      'Водительское удостоверение',
      'Страховой полис',
    ],
  });

  const pageParams = useParams();

  useEffect(() => {
    console.log(pageParams);
  }, []);

  return (
    <div>
      Hello, {pageParams.id}
      <h3>{appoint.name}</h3>
      <p>{appoint.status}</p>
    </div>
  );
}
