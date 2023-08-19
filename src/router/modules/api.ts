import { lazy } from 'react';
import { IRouter } from 'router';
import { FileIcon } from 'tdesign-icons-react';

const api: IRouter[] = [
  {
    path: '/api',
    meta: {
      title: 'API管理',
      Icon: FileIcon,
    },
    children: [
      {
        path: 'add',
        Component: lazy(() => import('pages/API/Add')),
        meta: {
          title: '新增ApiKey',
        },
      },
      {
        path: 'list',
        Component: lazy(() => import('pages/API/List')),
        meta: {
          title: '查看所有',
        },
      },
    ],
  },
];

export default api;
