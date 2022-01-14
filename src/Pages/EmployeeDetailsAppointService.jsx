import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { APPOINT_API_URL, AUTH_API_URL } from '../Api/Api';
import axios from 'axios';
import Loader from '../Components/Loader';
import MyMap from '../Components/AppointServiceForm/MyMap';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Placemark } from 'react-yandex-maps';
import TextField from '@mui/material/TextField';
import DropDownList from '../Components/AppointServiceForm/DropDownList';
import { useNavigate } from 'react-router-dom';

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

export default function EmployeeDetailsAppointService() {
  const navigate = useNavigate();

  const [appoint, setAppoint] = useState({
    id: 0,
  });

  const [personData, setPersonData] = useState({});

  const [allStatuses, setAllStatuses] = useState([
    'Ожидает выполнение',
    'Отправлено на обработку',
    'Отказано',
    'Выполнено',
  ]);

  // const [allStatuses, setAllStatuses] = useState([
  //   { name: 'Ожидает выполнение' },
  //   { name: 'Отправлено на обработку' },
  //   { name: 'Отказано' },
  //   { name: 'Выполнено' },
  // ]);

  const [status, setStatus] = useState({ name: '' });

  const pageParams = useParams();
  const queryParams = new URLSearchParams(window.location.search);

  const fetchData = (id) => {
    axios
      .get(APPOINT_API_URL + `Main/GetAppointById/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        setAppoint(resp.data);
        console.log(resp.data);
      })
      .catch((e) => alert(e));

    axios
      .get(AUTH_API_URL + `Accounts/${queryParams.get('carOwnerId')}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((resp) => {
        setPersonData(resp.data);
        console.log(resp.data);
      })
      .catch((e) => alert(e));
  };

  useEffect(() => {
    fetchData(pageParams.id);
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  const statusSubmit = () => {
    console.log(appoint.id);
    console.log(appoint.status);
    axios
      .post(APPOINT_API_URL + `Main/SetStatus/${appoint.id}?status=${status}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        navigate('/EmployeeAppointServiceList');
      })
      .catch((e) => alert(e));
  };

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
          <p>Фамилия: {personData.firstName}</p>
          <p>Имя: {personData.lastName}</p>
          <p>Отчество: {personData.middleName}</p>
          <p>Дата рождения: {personData.birthday}</p>
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

      <Box sx={{ Width: 120, maxWidth: 230, marginX: 'auto' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Статус</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Статус"
            onChange={handleStatus}
          >
            {allStatuses.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* <TextField
        className="personal-data-text-field input-status"
        label="Статус"
        id="outlined-size-small"
        defaultValue={appoint.status}
        onChange={handleStatus}
        // size="small"
      /> */}
      {/* <br /> */}
      <Button
        sx={{ marginBottom: 2, marginTop: 2, marginLeft: 0 }}
        variant="contained"
        className="input-status"
        onClick={statusSubmit}
      >
        Установить статус
      </Button>
      <br />
      <Link to="/EmployeeAppointServiceList">
        <Button variant="contained">Назад</Button>
      </Link>
    </div>
  ) : (
    <Loader />
  );
}
