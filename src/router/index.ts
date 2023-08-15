import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import dashboard from './modules/dashboard';
import login from './modules/login';
import otherRoutes from './modules/others';
import api from './modules/api';
import ippool from './modules/ippool';
import node from './modules/node';
import os from './modules/os';
import area from './modules/area';
import sysuser from './modules/sysuser';
import vm from './modules/vm';

export interface IRouter {
  path: string;
  redirect?: string;
  Component?: React.FC<BrowserRouterProps> | (() => any);
  /**
   * 当前路由是否全屏显示
   */
  isFullPage?: boolean;
  /**
   * meta未赋值 路由不显示到菜单中
   */
  meta?: {
    title?: string;
    Icon?: React.FC;
    /**
     * 侧边栏隐藏该路由
     */
    hidden?: boolean;
    /**
     * 单层路由
     */
    single?: boolean;
  };
  children?: IRouter[];
}

const routes: IRouter[] = [
  {
    path: '/login',
    Component: lazy(() => import('pages/Login')),
    isFullPage: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: '/dashboard/base',
  },
];

const allRoutes = [
  ...routes,
  ...dashboard,
  ...ippool,
  ...node,
  ...os,
  ...vm,
  ...area,
  ...sysuser,
  ...api,
  ...login,
  ...otherRoutes,
];

export default allRoutes;
