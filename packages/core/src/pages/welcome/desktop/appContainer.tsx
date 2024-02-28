import React from 'react';
import './appContainer.scss';

export function AppContainer({ title }) {
  return (
    <>
      <div className="h-25 w-22.5 flex flex-col flex-items-center">
        <div className="w-15 h-15 m-t-0.25 border-rd-2 app-bg app-shadow"></div>
        <label className="w-20 m-t-2 color-#fff font-bold font-size-3.25 text-truncate font-shadow">
          { title }
        </label>
      </div>
    </>
  );
}
