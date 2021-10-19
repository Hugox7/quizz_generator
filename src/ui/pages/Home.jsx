import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { isAuthenticatedSelector } from '../../redux/selectors/authSelectors';

function Home() {
  const theme = useTheme();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  console.log('isAuthed ', isAuthenticated);

  return (
    <Box p="20px">
      home
    </Box>
  );
}

export default Home;
