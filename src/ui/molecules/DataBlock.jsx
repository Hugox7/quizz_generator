import React from 'react';
import propTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

function DataBlock({ label, value, ...props }) {
  return (
    <Box {...props}>
      <Box mb="5px">
        <Typography variant="bodyBold">{label}</Typography>
      </Box>
      <Typography>{value || '-'}</Typography>
    </Box>
  )
}

DataBlock.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

DataBlock.defaultProps = {
  value: null,
};

export default DataBlock;
