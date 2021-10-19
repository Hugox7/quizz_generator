import React from 'react';
import flatten from 'flat';
import moment from 'moment';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LOCALE } from './storage/locale';
import translations from './translations';
import Router from './Router';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import HeaderWithStore from './ui/_features/HeaderWithStore';

const locale = LOCALE.get();
moment.locale(locale);

function App() {
  return (
    <IntlProvider
      locale={locale}
      messages={flatten(translations[locale])}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <HeaderWithStore />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
