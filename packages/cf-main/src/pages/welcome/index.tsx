import React from 'react';
import './index.scss';
import { Desktop } from './desktop';

export function Welcome() {
  return (
    <>
      <div className="w-100% h-100% bg">
        <Desktop></Desktop>
      </div>
    </>
  );
}
