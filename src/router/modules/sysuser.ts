import { lazy } from 'react';
import { IRouter } from 'router';
import { UserBusinessIcon } from 'tdesign-icons-react';

const sysuser: IRouter[] = [
  {
    path: '/sysuser',
    Component: lazy(() => import('pages/Sysuser/List')),
    meta: {
      title: '超管用户',
      Icon: UserBusinessIcon,
    },
  },
];

export default sysuser;
