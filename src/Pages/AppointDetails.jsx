import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { APPOINT_API_URL } from '../Api/Api';
import axios from 'axios';
import Loader from '../Components/Loader';
import MyMap from '../Components/AppointServiceForm/MyMap';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Placemark } from 'react-yandex-maps';
import UserContext from '../Context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AppointDetails() {
  const [appoint, setAppoint] = useState({
    id: 0,
  });
  const pageParams = useParams();

  const { inputValue } = useContext(UserContext); // Данные аккаунта

  const fetchData = (id) => {
    axios
      .get(APPOINT_API_URL + `Main/GetAppointById/${id}`)
      .then((resp) => {
        setAppoint(resp.data);
        console.log(resp.data);
      })
      .catch((e) => alert(e));
  };

  useEffect(() => {
    console.log(pageParams.id);
    fetchData(pageParams.id);
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return appoint.id !== 0 ? (
    <div className="appointDetails">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MyMap
            centerLat={appoint?.gibddOffice?.lat}
            centerLon={appoint?.gibddOffice?.lon}
            zoom={12}
          >
            <Placemark
              geometry={[appoint?.gibddOffice?.lat, appoint?.gibddOffice?.lon]}
            />
          </MyMap>
        </Box>
      </Modal>
      <h3 className="service-name">{appoint.service?.name}</h3>
      <div className="appoint-details-number">№ {appoint.id}</div>
      <hr />
      <div className="top-content">
        <div className="status">{appoint.status}</div>
        <div className="dateTime">
          {new Date(appoint.serviceDateTime?.date).toLocaleDateString() +
            ', ' +
            appoint.serviceDateTime?.time}
        </div>
      </div>
      <h3 className="region-office-name">
        {appoint.gibddOffice?.region?.name}, {appoint.gibddOffice?.name}
      </h3>
      <Button sx={{ marginLeft: 0 }} variant="contained" onClick={handleOpen}>
        Показать
      </Button>
      <div className="bottom-content">
        <div className="personal">
          <h3>Личные данные:</h3>
          <p>Фамилия: {inputValue.name}</p>
          <p>Имя: {inputValue.secondName}</p>
          <p>Отчество: {inputValue.middleName}</p>
          <p>Дата рождения: {inputValue.dateBirth}</p>
        </div>
        <div className="documents-list">
          <h3>Необходимые документы для осуществления услуги:</h3>
          <ul>
            {appoint.service?.documents.map((document) => (
              <li>{document.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <Link to="/AppointServiceList">
        <Button variant="contained">Назад</Button>
      </Link>
    </div>
  ) : (
    <Loader />
  );
}
