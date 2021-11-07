import React from 'react';
import { makeStyles } from '@mui/styles';
import propTypes from 'prop-types';
import clsx from 'clsx';
import { Button as MuiButton, CircularProgress } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiButtonBase-root': {
      textTransform: 'unset',
      fontWeight: 'bold',
      boxShadow: 'unset',
    },
  },
  secondary: {
    backgroundColor: `${theme.palette.tertiary.main} !important`,
  },
  textLight: {
    color: `${theme.palette.common.white} !important`,
  },
  isLoading: {
    position: 'relative',
    pointerEvents: 'none',
  },
  loader: {
    position: 'absolute',
    visibility: 'visible',
  },
  child: {
    visibility: 'hidden',
  },
}));

function Button({ children, variant, onClick, endIcon, startIcon, component, to, isLoading, fullWidth, disabled, type }) {
  const classes = useStyles();

  const buttonClasses = {
    ...classes,
    root: clsx(classes.root, {
      [classes.secondary]: variant === 'secondary',
      [classes.textLight]: variant === 'textLight',
    }),
  };

  let setVariant;
  if (variant === "primary") {
    setVariant = "contained";
  }
  if (variant === "secondary") {
    setVariant = "contained";
  }
  if (variant === "text") {
    setVariant = variant;
  }
  if (variant === "textLight") {
    setVariant = "text"
  }
  if (variant === "outlined") {
    setVariant = variant;
  }

  return (
    <MuiButton
      classes={buttonClasses}
      variant={setVariant}
      onClick={onClick}
      endIcon={endIcon}
      startIcon={startIcon}
      component={component}
      to={to}
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
    >
      <span className={isLoading ? classes.child : null}>
        {children}
      </span>
      {isLoading && (
        <CircularProgress
          className={classes.loader}
          color="inherit"
          size="1.4em"
        />
      )}
    </MuiButton>
  );
}

Button.propTypes = {
  children: propTypes.node.isRequired,
  variant: propTypes.oneOf(['primary', 'secondary', 'text', 'textLight', 'outlined']),
  onClick: propTypes.func,
  endIcon: propTypes.node,
  startIcon: propTypes.node,
  component: propTypes.oneOfType([propTypes.node, propTypes.string, propTypes.element, propTypes.object]),
  to: propTypes.string, // use only if component === Link
  isLoading: propTypes.bool,
  fullWidth: propTypes.bool,
  disabled: propTypes.bool,
  type: propTypes.oneOf(['button', 'reset', 'submit']),
};

Button.defaultProps = {
  variant: 'primary',
  onClick: () => {},
  endIcon: null,
  startIcon: null,
  component: null,
  to: null,
  isLoading: false,
  fullWidth: false,
  disabled: false,
  type: 'button',
};

export default Button;
