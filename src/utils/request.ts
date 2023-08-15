import axios from 'axios';
import proxy from '../configs/host';
import { TOKEN_NAME } from 'modules/user';
import { useNavigate } from 'react-router-dom';

const env = import.meta.env.MODE || 'development';
const API_HOST = proxy[env].API;

const SUCCESS_CODE = 20000;
const FORBIDDEN_CODE = 501002;
const TIMEOUT = 50000;

export const instance = axios.create({
  baseURL: API_HOST,
  timeout: TIMEOUT,
  headers: {
    Authorization: localStorage.getItem(TOKEN_NAME),
  },
  withCredentials: false,
});
instance.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  (response) => {
    if (response.data.code === FORBIDDEN_CODE) {
      console.log('鉴权失败, 尝试跳转到登录页');
      window.location.href = '/#/login';
    }
    if (response.status === 200) {
      const { data } = response;
      if (data.code === SUCCESS_CODE) {
        return data;
      }
      return Promise.reject(data);
    }
    return Promise.reject(response?.data);
  },
  (e) => Promise.reject(e),
);

export default instance;
