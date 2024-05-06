import axios from 'axios';

export const apiAxios = (path: string) => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_ADDRESS}/api/${path}`,
  });
};
