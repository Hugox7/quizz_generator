import React from 'react';
import { Box } from '@mui/material';

function FullScreenBox({ children, ...props }) {
  return (
    <Box position="absolute" top={0} bottom={0} left={0} right={0} {...props}>
      {children}
    </Box>
  );
}

export default FullScreenBox;
