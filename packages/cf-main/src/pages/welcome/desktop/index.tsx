import React from 'react';
import { AppContainer } from './appContainer';
import './index.scss';

export function Desktop() {
  const numberOfContainers = 100;
  const containers = Array.from({ length: numberOfContainers }, (_, index) => (
    <AppContainer key={index} />
  ));

  return (
    <>
      <div className="m-t-312 p-x-250 grid grid-gap-10 grid-template">
        {containers}
      </div>
    </>
  );
}
