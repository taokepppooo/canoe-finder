import React from 'react';
import './appContainer.scss';

export function AppContainer() {
  return (
    <>
      <div className="h-100 w-90 flex flex-col flex-items-center">
        <div className="w-60 h-60 m-t-11 border-rd-8 app-bg app-shadow"></div>
        <label className="w-80 m-t-8 color-#fff font-bold font-size-13 text-truncate font-shadow">
          图标组件示例组件示例组件示例
        </label>
      </div>
    </>
  );
}
