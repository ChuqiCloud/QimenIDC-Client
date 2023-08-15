import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import request from 'utils/request';

const namespace = 'user';
export const TOKEN_NAME = 'chuqiscm_token';

// login
export const login = async (userInfo: Record<string, unknown>) => {
  const { account, password } = userInfo;
  await request
    .post('/loginDo', {
      username: account,
      password,
    })
    .then((res) => {
      console.log(res);
      localStorage.setItem(TOKEN_NAME, res.data);
      document.cookie = `token=${res.data}`;
    });
};

// getUserInfo
export const getUserInfo = createAsyncThunk(`${namespace}/getUserInfo`, async (_, { getState }: any) => {
  const { token } = getState();
  const mockRemoteUserInfo = async (token: string) => {
    if (token === 'main_token') {
      return {
        name: 'td_main',
        roles: ['all'],
      };
    }
    return {
      name: 'td_dev',
      roles: ['userIndex', 'dashboardBase', 'login'],
    };
  };

  const res = await mockRemoteUserInfo(token);

  return res;
});

export const logout = async () => {
  localStorage.removeItem(TOKEN_NAME);
  document.cookie = 'token=';
};

export const selectListBase = (state: RootState) => state.listBase;
