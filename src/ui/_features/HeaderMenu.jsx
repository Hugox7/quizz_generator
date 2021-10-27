import React from 'react';
import propTypes from 'prop-types';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import useTranslate from '../../hooks/useTranslate';
import { initializeAuthThunk, logoutAction } from '../../redux/actions/authActions';
import { Link, useLocation } from 'react-router-dom';
import routes from '../../routing/routes';

function HeaderMenu({ open, onClose, anchorEl, setAnchorEl }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslate();

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(initializeAuthThunk());
    setAnchorEl(null);
  };

  const isProfileRoute = location.pathname === routes.profile.path;

  return (
    <Menu
      id="header-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
    >
      <MenuItem disabled={isProfileRoute} onClick={() => setAnchorEl(null)} component={Link} to={routes.profile.path}>
        {t('Header.Menu.myProfile')}
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        {t('Header.Menu.logout')}
      </MenuItem>
    </Menu>
  );
}

HeaderMenu.propTypes = {
  open: propTypes.bool,
  onClose: propTypes.func,
  anchorEl: propTypes.node,
  setAnchorEl: propTypes.func,
};

HeaderMenu.defaultProps = {
  open: false,
  onClose: () => {},
  anchorEl: null,
  setAnchorEl: () => {},
};

export default HeaderMenu;
