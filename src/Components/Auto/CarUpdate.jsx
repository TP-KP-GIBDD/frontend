import React, { useState, useEffect } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import DropDownList from '../AppointServiceForm/DropDownList';
import { useNavigate, pageParams } from 'react-router-dom';
import axios from 'axios';
import { AUTO_API_URL } from '../../Api/Api';

export default function CarRegistration() {
  const navigate = useNavigate();

  const pageParams = useParams();

  const [inputValues, setInputValues] = useState({
    stateNumber: '44325',
    vin: null,
    brand: null,
    model: null,
    year: null,
    power: null,
    color: null,
    bodyTypeId: null,
    rudderId: null,
  });

  const fetchCurrentCar = () => {
    console.log('HEEEY');
    axios
      .get(AUTO_API_URL + `GetAvto?id=${pageParams.id}`)
      .then((resp) => {
        console.log('resp data');
        console.log(resp.data);
        setInputValues({
          ...inputValues,
          stateNumber: resp.data.numberAvto,
          vin: resp.data.vin,
          brand: resp.data.brandModel.brand.id,
          model: resp.data.brandModel.id,
          year: resp.data.year,
          power: resp.data.power,
          color: resp.data.color.id,
          bodyTypeId: resp.data.bodyTypeId,
          rudderId: resp.data.rudderId,
        });
        console.log(inputValues);
      })
      .catch((e) => alert(e));
  };

  useEffect(() => {
    fetchCurrentCar();
    fetchBrands();
    fetchColor();
    fetchBodyTypes();
    fetchRudders();
  }, []);

  useEffect(() => {
    fetchModels(inputValues.brand);
  }, [inputValues.brand]);

  const [brands, setBrands] = useState(['']);
  const [models, setModels] = useState(['']);

  const [colors, setColors] = useState(['']);
  const [bodyTypes, setBodyTypes] = useState(['']);
  const [rudders, setRudders] = useState(['']);

  const fetchBrands = () => {
    axios
      .get(AUTO_API_URL + `api/Brand/GetBrands`)
      .then((resp) => setBrands(resp.data));
  };

  const fetchModels = (brandId) => {
    // Метод ModelsByBrandId
    axios
      .get(AUTO_API_URL + `api/BrandModel/GetBrandModelByBrandId?id=${brandId}`)
      .then((resp) => {
        console.log(resp);
        setModels(resp.data);
      });
  };

  const fetchColor = () => {
    axios
      .get(AUTO_API_URL + `api/ColorAvto/GetColorAvtoes`)
      .then((resp) => setColors(resp.data));
  };

  const fetchBodyTypes = () => {
    axios
      .get(AUTO_API_URL + `GetBodyTypes`)
      .then((resp) => setBodyTypes(resp.data));
  };

  const fetchRudders = () => {
    axios
      .get(AUTO_API_URL + `GetRudders`)
      .then((resp) => setRudders(resp.data));
  };

  const submit = () => {
    axios
      .post(
        AUTO_API_URL +
          `CreateAvto?NumberAvto=${inputValues.stateNumber}
          &Vin=${inputValues.vin}
          &BrandModelId=${inputValues.model}
          &Year=${inputValues.year}
          &Power=${inputValues.power}
          &ColorId=${inputValues.color}
          &BodyTypeId=${inputValues.bodyTypeId}
          &RudderId=${inputValues.rudderId}`
      )
      .then((resp) => {
        if (resp.status === 200) {
          navigate('/CarCrud');
        } else {
          alert('Error');
        }
      });
  };

  const handleBrand = (e) => {
    setInputValues({ ...inputValues, brand: e.target.value });
  };

  const handleModel = (e) => {
    setInputValues({ ...inputValues, model: e.target.value });
  };

  const handleColor = (e) => {
    setInputValues({ ...inputValues, color: e.target.value });
  };

  const handleBodyType = (e) => {
    setInputValues({ ...inputValues, bodyTypeId: e.target.value });
  };

  const handleRudder = (e) => {
    setInputValues({ ...inputValues, rudderId: e.target.value });
  };

  const handleChange = (e) => {
    console.log(e);
    switch (e.target.name) {
      case 'stateNumber':
        setInputValues({ ...inputValues, stateNumber: e.target.value });
        break;
      case 'vin':
        setInputValues({ ...inputValues, vin: e.target.value });
        break;

      case 'year':
        setInputValues({ ...inputValues, year: e.target.value });
        break;
      case 'power':
        setInputValues({ ...inputValues, power: e.target.value });
        break;
    }
  };

  return (
    <div>
      <Link to="/employee">
        <Button type={'submit'} size="small">
          Сотруднику
        </Button>
      </Link>
      <div className="personal-data">
        <div>
          <span>
            <TextField
              className="personal-data-text-field"
              label="Гос. Знак"
              id="outlined-size-small"
              name="stateNumber"
              defaultValue={inputValues.stateNumber}
              size="small"
              sx={{ width: 300, height: 40 }}
              onChange={handleChange}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="VIN Номер"
              id="outlined-size-small"
              name="vin"
              defaultValue={inputValues.vin}
              size="small"
              sx={{ width: 300, marginBottom: 2 }}
              onChange={handleChange}
            />
          </span>
          <br />

          <DropDownList
            items={brands}
            title="Марка"
            name="brand"
            value={inputValues.brand}
            size="small"
            onChange={handleBrand}
          />

          <br />

          <DropDownList
            items={models}
            title="Модель"
            name="model"
            value={inputValues.model}
            onChange={handleModel}
          />

          <span>
            <TextField
              className="personal-data-text-field"
              label="Год"
              id="outlined-size-small"
              name="year"
              defaultValue={inputValues.year}
              onChange={handleChange}
              size="small"
              sx={{ width: 300 }}
            />
          </span>
          <br />
          <span>
            <TextField
              className="personal-data-text-field"
              label="Мощность"
              id="outlined-size-small"
              name="power"
              defaultValue={inputValues.power}
              onChange={handleChange}
              size="small"
              sx={{ width: 300, marginBottom: 2 }}
            />
          </span>

          <span>
            <DropDownList
              items={colors}
              title="Цвет"
              name="color"
              value={inputValues.color}
              onChange={handleColor}
            />
          </span>
          <br />
          <span>
            <DropDownList
              items={bodyTypes}
              title="Тип кузова"
              name="bodyTypeId"
              value={inputValues.bodyTypeId}
              onChange={handleBodyType}
            />
          </span>
          <br />
          <span>
            <DropDownList
              items={rudders}
              title="Руль"
              name="rudderId"
              value={inputValues.rudderId}
              onChange={handleRudder}
            />
          </span>
        </div>
      </div>

      <Button
        sx={{ marginTop: 1, width: 300 }}
        className="profile-appointment"
        type={'submit'}
        variant="outlined"
        href=""
        size="small"
        onClick={submit}
      >
        Обновить автомобиль
      </Button>
      <br />
      <Link to="/CarCrud">
        <Button
          sx={{ marginTop: 1, width: 300 }}
          className="profile-appointment"
          variant="outlined"
          color="error"
          size="small"
        >
          Отмена
        </Button>
      </Link>
      {/* <Alert variant="outlined" severity="error">
        This is an error alert — check it out!
      </Alert> */}
    </div>
  );
}
