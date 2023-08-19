import { lazy } from 'react';
import { IRouter } from 'router';
import { DataBaseIcon } from 'tdesign-icons-react';

const ippool: IRouter[] = [
  {
    path: '/ippool',
    meta: {
      title: 'IP池',
      Icon: DataBaseIcon,
    },
    children: [
      {
        path: '/list',
        Component: lazy(() => import('pages/IpPool/List')),
        meta: {
          title: '查看全部',
        },
      },
    ],
  },
];

export default ippool;
