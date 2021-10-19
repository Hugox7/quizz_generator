import React from 'react';
import propTypes from 'prop-types';
import { AppBar, Box, Button, Typography, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from '../../routing/routes';
import { useDispatch } from 'react-redux';
import { initializeAuthThunk, logoutAction } from '../../redux/actions/authActions';

const useStyles = makeStyles((theme) => ({
  root: {
    height: `${theme.constants.headerHeight}px`,
  },
  button: {
    // TODO atom button
    textTransform: 'unset !important',
    color: `${theme.palette.common.white} !important`,
    backgroundColor: `${theme.palette.tertiary.main} !important`,
    boxShadow: 'unset !important',
    fontWeight: 'bold !important',
  },
  buttonText: {
    // TODO atom button
    textTransform: 'unset !important',
    color: `${theme.palette.common.white} !important`,
    boxShadow: 'unset !important',
    fontWeight: 'bold !important',
  },
}));

function Header({ isAuthenticated, user }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();

  // TODO to be removed
  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(initializeAuthThunk());
  };

  return (
    <AppBar className={classes.root} position="static" color="primary">
      <Box display="flex" alignItems="center" justifyContent="space-between" height="100%" width="100%">
        <Box pl="20px">
          <Typography variant="h2">
            <FormattedMessage id="Header.logo" />
          </Typography>
        </Box>
        <Box pr="20px">
          {isAuthenticated ? (
            <Box display="flex" alignItems="center">
              <Button component={Link} to="#" variant="contained" className={classes.button}>
                <FormattedMessage id="Header.create" />
              </Button>
              <Box ml="20px">
                {/* TODO atom button */}
                <Button className={classes.buttonText} endIcon={<ArrowDropDown />} onClick={handleLogout}>
                  <FormattedMessage id="Header.myAccount" />
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {/* TODO atom button */}
              <Button component={Link} to={routes.login.path} variant="contained" className={classes.button}>
                <FormattedMessage id="Header.login" />
              </Button>
            </>
          )}
        </Box>
      </Box>
    </AppBar>
  );
}

Header.propTypes = {
  isAuthenticated: propTypes.bool,
  user: propTypes.shape({}),
};

Header.defaultProps = {
  isAuthenticated: false,
  user: null,
};

export default Header;
