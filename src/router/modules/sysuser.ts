import { IRouter } from 'router';
import { UserBusinessIcon } from 'tdesign-icons-react';

const sysuser: IRouter[] = [
  {
    path: '/sysuser',
    meta: {
      title: '超管用户',
      Icon: UserBusinessIcon,
    },
  },
];

export default sysuser;
