import axios from 'axios';

import {BASE_URI} from '@app/variables';

import {storeData} from './storage';

const $host = axios.create({
  baseURL: BASE_URI,
  headers: {
    'Content-Type': 'text/plain',
  },
});

//"pon02an110k18" "9148978a"

export async function Login(login: string, password: string) {
  const raw = {login, password};
  return await $host
    .post('/api.cgi/users/login', raw)
    .then(async response => {
      const data = response?.data;
      if (data.uid) {
        await storeData(raw, 'userData');
        await storeData(data, 'keys');
        data.status = 1;
      } else {
        data.status = 0;
      }
      return data;
    })
    .catch(e => console.warn(e));
}
