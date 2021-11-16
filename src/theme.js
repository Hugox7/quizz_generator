import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    primary: {
      // main: '#11b1d5',
      main: '#005273',
      strong: '#007C9E',
      light: '#E6F4F1',
    },
    secondary: {
      main: '#F79334',
    },
    tertiary: {
      main: '#F79334',
    },
    neutral: {
      primary: '#EFEFF4',
      secondary: '#E2E2EA',
      tertiary: '#92929D',
    },
    error: {
      main: '#d32f2f',
    }
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Hind Vadodara, sans-serif',
    fontSize: 16,
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    bodyBold: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '20px',
    },
    bodyTitle: {
      fontSize: '24px',
      fontWeight: 400,
    },
    h1: {
      fontFamily: 'Kaushan Script',
      fontSize: '45px',
      fontWeight: 'bold',
      lineHeight: '40px',
    },
    h2: {
      fontFamily: 'Kaushan Script',
      fontSize: '36px',
      lineHeight: '40px',
    },
    h3: {
      fontFamily: 'Delius Swash Caps',
      fontSize: '28px',
      lineHeight: '40px',
    },
    subtitle: {
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '18px',
    },
  },
  constants: {
    headerHeight: '80',
    padding: '20',
    radius: '10',
  },
});

export default theme;
