import React from 'react';
import propTypes from 'prop-types';
import { InputBase, MenuItem, Select, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  basic: {
    border: `1px solid ${theme.palette.neutral.secondary} !important`,
    borderRadius: '5px !important',
    padding: '10px !important',
    '&.Mui-focused': {
      borderColor: `${theme.palette.primary.main} !important`,
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

const Input = React.forwardRef(({ value, onChange, onBlur, fullWidth, name, size, type, text, select, items }, ref) => {
  const classes = useStyles();

  const isSmall = 'small' === size;
  const isMedium = 'medium' === size;
  const isLarge = 'large' === size;

  const inputClasses = {
    ...classes,
    root: clsx(classes.basic, {
      [classes.small]: isSmall && !text,
      [classes.medium]: isMedium && !text,
      [classes.large]: isLarge && !text,
    }),
  };

  if (select) {
    return (
      <Select
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth={fullWidth}
        name={name}
        classes={{ root: {...classes.basic, height: 36 } }}
      >
        {items.map((item) => {
          return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
        })}
      </Select>
    );
  }

  return (
    <InputBase
      multiline={text}
      rows={3}
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      fullWidth={fullWidth}
      name={name}
      type={type}
      classes={inputClasses}
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
  text: propTypes.bool,
  select: propTypes.bool,
  items: propTypes.arrayOf(propTypes.shape({

  })),
};

Input.defaultProps = {
  value: undefined,
  onChange: () => {},
  onBlur: () => {},
  fullWidth: false,
  name: null,
  type: 'text',
  size: 'medium',
  text: false,
  select: false,
  items: [],
};

export default Input;
