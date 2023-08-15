import React, { memo } from 'react';
import TopPanel from './components/TopPanel';
import MiddleChart from './components/MiddleChart';
import RankList from './components/RankList';
import Overview from './components/Overview';
import request from 'utils/request';

const DashBoard = () => {
  request.get('/selectApiByPage').then((res) => {
    console.log(res);
  });
  return (
    <div style={{ overflowX: 'hidden' }}>
      <TopPanel />
      <MiddleChart />
      <RankList />
      <Overview />
    </div>
  );
};

export default memo(DashBoard);
