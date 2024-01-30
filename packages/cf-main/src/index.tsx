import React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './main';
import './i18n';
import 'cf-theme/index.css';
import './style/index.scss';
import 'uno.css';
import 'virtual:uno.css';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<Main />);
