import React, { memo, useState } from 'react';
import classNames from 'classnames';
import Login from './components/Login';
import LoginHeader from './components/Header';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';

import Style from './index.module.less';

export default memo(() => {
  const [type, setType] = useState('login');
  const globalState = useAppSelector(selectGlobal);
  const { theme } = globalState;

  return (
    <div
      className={classNames(Style.loginWrapper, { [Style.light]: theme === 'light', [Style.dark]: theme !== 'light' })}
    >
      <LoginHeader />
      <div className={Style.loginContainer}>
        <div className={Style.titleContainer}>
          <h1 className={Style.title}>登录到</h1>
          <h1 className={Style.title}>初七云管</h1>
          <div className={Style.subTitle}>
          </div>
        </div>
        <Login />
      </div>
      <footer className={Style.copyright}>Copyright @ 2023 Chuqiscm. All Rights Reserved</footer>
    </div>
  );
});
