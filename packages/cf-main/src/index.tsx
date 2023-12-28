import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './main';
import 'virtual:uno.css';
import './index.scss';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<Main />);
