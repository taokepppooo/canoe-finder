import type { RouteObject } from 'react-router-dom';
import { Welcome } from '@/pages/welcome';
import React from 'react';
const route: RouteObject[] = [
  {
    path: '/',
    element: <Welcome />
  }
];

export default route;
