import { APPOINT_API_URL } from './Api';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const fetchRegions = () => {
  return axios
    .get(APPOINT_API_URL + 'region')
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((e) => console.log('Произошла ошибка ' + e));
};
