import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { App } from './components';
import { mainTheme } from './theme';
import { ThemeProvider } from '@material-ui/core';
import { MainStateManager } from './models';
import { SelfErrorBoundry } from './layouts/errors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/jalaali';
import JMoment from 'moment-jalaali';

const mainStatemanager = new MainStateManager();

JMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

ReactDOM.render(
  <React.Fragment>
    <SelfErrorBoundry>
      <MuiPickersUtilsProvider utils={MomentUtils} locale='fa' >
        <ThemeProvider theme={mainTheme} >
          <App mainStateManager={mainStatemanager} />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </SelfErrorBoundry>
  </React.Fragment>,
  document.getElementById('root')
);

