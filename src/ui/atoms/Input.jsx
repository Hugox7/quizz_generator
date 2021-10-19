import React from 'react';
import propTypes from 'prop-types';
import { InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  basic: {
    border: `1px solid ${theme.palette.neutral.secondary}`,
    borderRadius: '5px',
    padding: '10px',
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
    },
  },
  small: {
    height: 26,
    boxSizing: 'border-box',
  },
  medium: {
    height: 36,
    boxSizing: 'border-box',
  },
  large: {
    height: 42,
    boxSizing: 'border-box',
  },
}));

const Input = React.forwardRef(({ value, onChange, onBlur, fullWidth, name, size, type }, ref) => {
  const classes = useStyles();

  const isSmall = 'small' === size;
  const isMedium = 'medium' === size;
  const isLarge = 'large' === size;

  const inputClasses = {
    ...classes,
    root: clsx(classes.basic, {
      [classes.small]: isSmall,
      [classes.medium]: isMedium,
      [classes.large]: isLarge,
    }),
  };

  return (
    <InputBase
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth={fullWidth}
      name={name}
      type={type}
      classes={inputClasses} // TODO
    />
  );
})

Input.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  onBlur: propTypes.func,
  fullWidth: propTypes.bool,
  name: propTypes.string,
  type: propTypes.string,
  size: propTypes.oneOf(['small', 'medium', 'large']),
};

Input.defaultProps = {
  value: undefined,
  onChange: () => {},
  onBlur: () => {},
  fullWidth: false,
  name: null,
  type: 'text',
  size: 'medium',
};

export default Input;
