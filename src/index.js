import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './modules/App';
import { RTL } from './modules/components'
import { ContextProvider } from './modules/contexts'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RTL>
      <ContextProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <App />
        </LocalizationProvider>
      </ContextProvider>
    </RTL>
);
