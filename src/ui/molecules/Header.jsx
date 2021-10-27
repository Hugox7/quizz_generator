import React, { useState } from 'react';
import propTypes from 'prop-types';
import { AppBar, Box, Button, Typography, useTheme } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import routes from '../../routing/routes';
import Avatar from '../atoms/Avatar';
import HeaderMenu from '../_features/HeaderMenu';
import CreateQuizzDialog from '../_features/CreateQuizzDialog';

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
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.root} position="static" color="primary">
      <Box display="flex" alignItems="center" justifyContent="space-between" height="100%" width="100%">
        <Box
          pl="20px"
          component={Link}
          to={routes.home.path}
          style={{ textDecoration: 'none', color: theme.palette.common.white }}
        >
          <Typography variant="h2">
            <FormattedMessage id="Header.logo" />
          </Typography>
        </Box>
        <Box pr="20px">
          {isAuthenticated ? (
            <Box display="flex" alignItems="center">
              <Button onClick={() => setOpen(true)} variant="contained" className={classes.button}>
                <FormattedMessage id="Header.create" />
              </Button>
              <Box ml="20px" mr="18px">
                {/* TODO atom button */}
                <Button className={classes.buttonText} endIcon={<ArrowDropDown />} onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <FormattedMessage id="Header.myAccount" />
                </Button>
              </Box>
              <Avatar user={user} size="small" />
              {open && <CreateQuizzDialog open={open} handleClose={() => setOpen(false)} />}
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
      <HeaderMenu
        onClose={handleCloseMenu}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
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
