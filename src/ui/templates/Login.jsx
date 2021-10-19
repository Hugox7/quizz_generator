import React from 'react';
import propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@mui/styles';
import { Box, Button, CircularProgress, FormControl, FormHelperText, FormLabel, Typography, useTheme } from '@mui/material';
import CenteredBox from '../molecules/CenteredBox';
import Input from '../atoms/Input';
import { Link } from 'react-router-dom';
import routes from '../../routing/routes';

const useLabelStyles = makeStyles((theme) => ({
  focused: {
    color: theme.palette.primary.strong,
  },
}));

const useStyles = makeStyles((theme) => ({
  // TODO create atoms button and progress
  button: {
    textTransform: 'unset !important',
    color: `${theme.palette.common.white} !important`,
    fontWeight: 'bold !important',
  },
  progress: {
    color: theme.palette.common.white,
  }
}));

function LoginTemplate({ form, error, loading }) {
  const labelClasses = useLabelStyles();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <CenteredBox>
      <Box width="450px">

        <Box textAlign="center" mb="10px">
          <Typography variant="h1" color={theme.palette.primary.main}>
            <FormattedMessage id="Login.title"/>
          </Typography>
        </Box>

        <Box whiteSpace="pre-wrap" textAlign="center" mb="10px" >
          <Typography variant="body1">
            <FormattedMessage id="Login.subtitle"/>
          </Typography>
        </Box>

        <form onSubmit={form.handleSubmit} method="post">
          <FormControl required fullWidth margin="normal">
            <FormLabel classes={labelClasses} htmlFor="email">
              <FormattedMessage id="Login.labels.email" />
            </FormLabel>
            <Input
              fullWidth
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="email"
            />
          </FormControl>
          {form.errors?.email && form.touched?.email && (
            <FormHelperText error data-testid="error-email">
              {form.errors.email}
            </FormHelperText>
          )}
          <FormControl required fullWidth margin="normal">
            <FormLabel classes={labelClasses} htmlFor="password">
              <FormattedMessage id="Login.labels.password" />
            </FormLabel>
            <Input
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="password"
              type="password"
            />
          </FormControl>
          {form.errors?.password && form.touched?.password && (
            <FormHelperText error data-testid="error-email">
              {form.errors.password}
            </FormHelperText>
          )}
          <Box mt="25px" mb="5px">
            <Typography variant="subtitle">
              <FormattedMessage id="Login.register.text" />
              <span>
                <Link to={routes.register.path}><FormattedMessage id="Login.register.link" /></Link>
              </span>
            </Typography>
          </Box>
          {/* TODO create atoms button and progress */}
          <Button fullWidth variant="contained" className={classes.button} type="submit" disabled={form.errors?.email || form.errors?.password}>
            {
              loading
                ? <CircularProgress size={28} className={classes.progress} />
                : <FormattedMessage id="Login.cta.login" />
              }
          </Button>
          {error && (
            <Box textAlign="center" mt="15px">
              <Typography color={theme.palette.error.main}>
                <FormattedMessage id="Login.errors.credentials" />
              </Typography>
            </Box>
          )}
        </form>

      </Box>
    </CenteredBox>
  );
}

LoginTemplate.propTypes = {
  form: propTypes.shape({
    handleSubmit: propTypes.func,
    handleChange: propTypes.func,
    values: propTypes.shape({
      email: propTypes.string,
      password: propTypes.string,
    }),
  }),
  error: propTypes.bool,
  loading: propTypes.bool,
};

LoginTemplate.defaultProps = {
  form: {},
  error: false,
  loading: false,
};

export default LoginTemplate;
