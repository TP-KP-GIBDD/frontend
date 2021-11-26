import axios from 'axios';
import { setRegions } from '../../Reducers/appointReducer';
import { APPOINT_API_URL } from '../../Api/Api';

export const getRegions = () => {
  return async (dispatch) => {
    const response = await axios.get(APPOINT_API_URL + 'region');
    dispatch(setRegions(response.data));
    console.log('action: ' + response.data);
  };
};
