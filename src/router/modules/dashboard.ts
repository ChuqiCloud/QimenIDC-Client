import { lazy } from 'react';
import { DashboardIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const dashboard: IRouter[] = [
  {
    path: '/dashboard/base',
    Component: lazy(() => import('pages/Dashboard/Base')),
    meta: {
      title: '统计报表',
      Icon: DashboardIcon,
    },
  },
];

export default dashboard;
