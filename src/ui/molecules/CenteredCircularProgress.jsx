import React from 'react'
import { Box, CircularProgress } from '@mui/material';

function CenteredCircularProgress() {
  return(
    <Box
      position="absolute"
      left="0"
      right="0"
      bottom="0"
      top="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="-1000"
    >
      <CircularProgress />
    </Box>
  );
}

export default CenteredCircularProgress;
