import React from 'react';
import { Route } from 'react-router-dom';

/**
 * 등록된 라우트의 모든 경로를 반환합니다
 * @returns {string[]} 모든경로 배열
 */
const getPaths = routes => routes
  .map(route => route?.children
    ? getPaths(route.children).map(path => `${route.path}/${path}`)
    : route.path)
  .flat(Infinity)
  .map(path => path.replace(/\/{2,}/g, '/'));

/**
 * 커스텀한 라우트 객체를 react-router 패키지 객체로 변환 합니다
 * @param {*} routes 커스텀 라우트 객체
 * @returns react-router 패키지 객체
 */
export const createClientRouter = routes => routes.map(route =>
  <Route key={route.path} path={route.path} element={route.element}>
    {route?.children ? createClientRouter(route.children) : undefined}
  </Route>);

/**
 * @typedef {(res: any, req: any, next: Function) => void} RouteHandler 라우트 핸들러
 * @typedef {(path: string, handler: RouteHandler) => void} CreateServerRouterAdd CreateServerRouter add 메소드
 * @typedef {(app: any) => void} CreateServerRouterRun CreateServerRouter run 메소드
 */
/**
 * 라우트 객체를 express 서버 라우트 로직으로 변환 등록합니다
 * @param {*} routes 라우트 객체
 * @param {*} handler 라우팅 로직
 * @returns {{ add: CreateServerRouterAdd; run: CreateServerRouterRun; }} 서버 라우트 로직을 등록하고 실행하는 객체
 */
export const createServerRouter = (routes, handler) => {
  const _routes = getPaths(routes).reduce((acc, cur) => (acc[cur] = handler, acc), {});

  return {
    add: (path, handler) => _routes[path] = handler,
    run: app => Object.entries(_routes).forEach(([path, handler]) => app.get(path, handler))
  };
};