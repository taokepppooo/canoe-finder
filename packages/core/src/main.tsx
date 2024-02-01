import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './route';

export function Main() {
  return (
    <div className="h-full light-theme">
      <RouterProvider router={router} />
    </div>
  );
}
