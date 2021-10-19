import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import propTypes from 'prop-types'
import React from 'react';
import useHiddenHeader from '../../hooks/useHiddenHeader';

/**
 * Displays a box centered in full width and height wrapper
 */

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperWithHeader: {
    minHeight: `calc(100vh - ${theme.constants.headerHeight}px)`,
  },
  wrapperWithoutHeader: {
    minHeight: '100vh',
  },
  box: {
    borderRadius: `${theme.constants.radius}px`,
    padding: `${theme.constants.padding}px`,
    boxShadow: '10px 10px 14px 1px rgb(0 0 0 / 20%)',
  },
}));

function CenteredBox({ wrapperBg, boxBg, children, ...props }) {
  const classes = useStyles();
  const { isHiddenHeaderRoute } = useHiddenHeader();

  const wrapperClassName = clsx(classes.wrapper, {
    [classes.wrapperWithHeader]: !isHiddenHeaderRoute,
    [classes.wrapperWithoutHeader]: isHiddenHeaderRoute,
  });

  return (
    <Box className={wrapperClassName} backgroundColor={wrapperBg}>
      <Box className={classes.box} backgroundColor={boxBg} {...props}>
        {children}
      </Box>
    </Box>
  );
}

CenteredBox.propTypes = {
  wrapperBg: propTypes.string,
  boxBg: propTypes.string,
};

CenteredBox.defaultProps = {
  wrapperBg: '#E6F4F1',
  boxBg: '#FFFFFF',
};

export default CenteredBox;
