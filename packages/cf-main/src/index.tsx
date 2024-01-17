import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './main';
import './style/index.scss';
import 'uno.css';
import 'virtual:uno.css';
import './index.scss';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<Main />);
