import { React, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { APPOINT_API_URL } from '../../Api/Api';
import DropDownList from './DropDownList';
import Map from './Map';

export default function AppointServiceForm() {
  const [inputValues, setInputValues] = useState({
    gibddOffice: 5,
    region: 0,
  });

  const [regions, setRegions] = useState([]);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = () => {
    const resp = axios.get(APPOINT_API_URL + 'region').then((response) => {
      setRegions(response.data);
    });
  };

  // const [item, setItem] = useState('');

  const handleChange = (event) => {
    setInputValues({ ...inputValues, region: event.target.value });
    console.log(event);
  };

  return (
    <form>
      <DropDownList
        items={regions}
        title="Регион"
        value={inputValues.region}
        onChange={handleChange}
      />

      <Map />
    </form>
  );
}
