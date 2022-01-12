import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { APPOINT_API_URL } from '../../Api/Api';
import DropDownList from './DropDownList';
import MyMap from './MyMap';
import TrueStep from './TrueStep';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Placemark, YMaps } from 'react-yandex-maps';
import jwt from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AppointServiceForm(props) {
  const navigate = useNavigate;

  const [inputValues, setInputValues] = useState({
    region: null,
    gibddOffice: null,
    service: null,
    dateTime: null,
  });

  const [regions, setRegions] = useState([]);
  const [offices, setOffices] = useState([]);
  const [services, setServices] = useState([]);
  const [times, setTimes] = useState([]);

  const [date, setDate] = useState(Date.now());

  const [centerCoords, setCenterCoords] = useState({
    lat: 55.751574,
    lon: 37.573856,
  });

  useEffect(() => {
    fetchTimesByDate(date);
  }, [date]);

  useEffect(() => {
    fetchOfficesByRegionId(inputValues.region);

    setCenterCoords({
      ...centerCoords,
      lat: regions[inputValues.region - 1]?.lat,
      lon: regions[inputValues.region - 1]?.lon,
    });
    console.log(regions[inputValues.region]);
  }, [inputValues.region]);

  useEffect(() => {
    fetchRegions();
    fetchServices();
  }, []);

  const fetchRegions = () => {
    const resp = axios.get(APPOINT_API_URL + 'region').then((response) => {
      setRegions(response.data);
    });
  };

  const fetchServices = () => {
    axios.get(APPOINT_API_URL + 'service').then((resp) => {
      setServices(resp.data);
    });
  };

  const fetchOfficesByRegionId = (id) => {
    axios
      .get(APPOINT_API_URL + `GibddOffice/GetOfficesByRegionId/${id}`)
      .then((response) => {
        setOffices(response.data);
      });
  };

  const fetchTimesByDate = (date) => {
    axios
      .get(APPOINT_API_URL + `DateTime/GetTimesByDate/${date}`)
      .then((responce) => {
        setTimes(responce.data);
      })
      .catch(setTimes([]));
  };

  const handleChangeRegion = (e) => {
    setInputValues({ ...inputValues, region: e.target.value });
  };

  const handleChangeOffice = (e) => {
    setInputValues({ ...inputValues, gibddOffice: e.target.value });
  };

  // const handleChangeOfficeMap = (officeId) => {
  //   setInputValues({ ...inputValues, gibddOffice: officeId });
  // };

  const handleChangeService = (e) => {
    setInputValues({ ...inputValues, service: e.target.value });
  };

  const hundleDate = (e) => {
    setDate(e.target.value);
  };

  const hundleSubmit = (e) => {
    e.preventDefault();

    const userId = Number(jwt(localStorage.getItem('token')).id);
    console.log(userId);
    if (userId !== null) {
      axios
        .post(APPOINT_API_URL + `Main`, {
          CarOwnerId: userId,
          RegionId: 1,
          GibddOfficeId: inputValues.gibddOffice,
          ServiceId: inputValues.service,
          DateTimeId: inputValues.dateTime,
        })
        .then((response) => {
          navigate('/AppointServiceList');
        })
        .catch((e) => alert(e));
    } else {
      alert('ERROR');
    }
  };

  // Stepper functions
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <form onSubmit={hundleSubmit}>
      <TrueStep
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
      >
        <Step key={0}>
          <StepLabel optional={null}>Подразделение ГИБДД</StepLabel>
          <StepContent>
            <Typography>
              {/* Step 1 */}
              {console.log(regions)}
              <div className="Stepper-step-content">
                <DropDownList
                  items={regions}
                  title="Регион"
                  value={inputValues.region}
                  onChange={handleChangeRegion}
                />

                <MyMap
                  centerLat={centerCoords.lat}
                  centerLon={centerCoords.lon}
                  zoom={9}
                >
                  {offices.map((item) => {
                    return (
                      <Placemark
                        onClick={() => {
                          setInputValues({
                            ...inputValues,
                            gibddOffice: item.id,
                          });
                        }}
                        geometry={[item.lat, item.lon]}
                        modules={[
                          'geoObject.addon.balloon',
                          'geoObject.addon.hint',
                        ]}
                        properties={{
                          // Хинт показывается при наведении мышкой на иконку метки.
                          hintContent: item.name,
                          // Балун откроется при клике по метке.
                          balloonContent: item.name,
                        }}
                        options={{}}
                      />
                    );
                  })}
                </MyMap>

                <DropDownList
                  items={offices}
                  title="Подразделение ГИБДД"
                  value={inputValues.gibddOffice}
                  onChange={handleChangeOffice}
                />
              </div>
            </Typography>
            <Box sx={{ mb: 2 }}>
              <div className="Stepper-btn-wrapper">
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Далее
                </Button>
                <Button
                  disabled={true}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Назад
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step key={1}>
          <StepLabel optional={null}>Личные данные</StepLabel>
          <StepContent>
            <Typography>{/* Step 2 */}</Typography>
            <Box sx={{ mb: 2 }}>
              <div className="Stepper-btn-wrapper">
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Далее
                </Button>
                <Button
                  disabled={false}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>

        <Step key={2}>
          <StepLabel>Услуга</StepLabel>
          <StepContent>
            <Typography className="stepper-appoint-wrapper">
              {/* Step 3 */}

              <DropDownList
                items={services}
                title="Тип услуги"
                value={inputValues.service}
                onChange={handleChangeService}
              />
              <br />
              <TextField
                // sx={{}}
                className="date-input"
                id="date"
                label="Дата"
                type="date"
                defaultValue="2021-12-07"
                value={date}
                onChange={hundleDate}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <div className="form-times">
                {times.length !== 0 &&
                  times.map((item) => (
                    <Button
                      // variant="outlined"
                      className="time-item"
                      variant={
                        inputValues.dateTime === item.id
                          ? 'contained'
                          : 'outlined'
                      }
                      href="#outlined-buttons"
                      disabled={!item.isFree}
                      onClick={() => {
                        setInputValues({ ...inputValues, dateTime: item.id });
                      }}
                    >
                      {item.time}
                    </Button>
                  ))}
              </div>
            </Typography>
            <Box sx={{ mb: 2 }}>
              <div className="Stepper-btn-wrapper">
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  type="submit"
                >
                  Отправить
                </Button>
                <Button
                  disabled={false}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Назад
                </Button>
              </div>
            </Box>
          </StepContent>
        </Step>
      </TrueStep>
    </form>
  );
}
