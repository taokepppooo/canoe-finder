import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './route';
import '@unocss/reset/normalize.css';
import '@unocss/reset/sanitize/sanitize.css';
import '@unocss/reset/sanitize/assets.css';

export function Main() {
  return (
    <div className="h-full light-theme">
      <RouterProvider router={router} />
    </div>
  );
}
