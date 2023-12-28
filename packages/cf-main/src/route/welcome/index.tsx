import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Welcome } from '../../pages/welcome';
const route: RouteObject[] = [
  {
    path: '/',
    element: <Welcome />
  }
];

export default route;
