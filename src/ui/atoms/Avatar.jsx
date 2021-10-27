import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import propTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { avatarColors } from '../../constants/avatarColors';

/**
 * @param {object} user
 * @param {string} src // use this prop only if you want to pass an image herself and not a link to this image
 * @param {string} size
 */

 const useStyles = makeStyles((theme) => ({
  bordered: {
    border: `2px solid ${theme.palette.common.white}`
  },
  small: {
    height: `38px !important`,
    width: `38px !important`,
  },
  medium: {
    height: `80px !important`,
    width: `80px !important`,
  },
  large: {
    height: `100px !important`,
    width: `100px !important`,
  },
 }));

function Avatar({ user, size, src }) {
  const classes = useStyles();

  const avatarClasses = clsx({
    [classes.bordered]: !user.profilePic,
    [classes.small]: size === 'small',
    [classes.medium]: size === 'medium',
    [classes.large]: size === 'large',
  })

  if (!user) {
    return null;
  }

  if (!user.profilePic) {

    const initial = user.name.substring(0, 1).toUpperCase();

    return (
    <MuiAvatar className={avatarClasses} sx={{ bgcolor: avatarColors[user.color] }}>
      {initial}
    </MuiAvatar>
    );
  }

  if (!src) {
    return (
      <MuiAvatar className={avatarClasses}  variant="circular">
        <img src={user.profilePic} alt="profile-pic" style={{ maxWidth: '100%', height: 'auto' }} />
      </MuiAvatar>
    );
  }

  return (
    <MuiAvatar src={src} variant="circular" className={avatarClasses} />
  );
}

Avatar.propTypes = {
  user: propTypes.shape({
    color: propTypes.string,
    profilePic: propTypes.string,
  }),
  src: propTypes.string,
  size: propTypes.oneOf(['small', 'medium', 'large']),
};

Avatar.defaultProps = {
  user: null,
  src: null,
  size: 'medium',
};

export default Avatar;
