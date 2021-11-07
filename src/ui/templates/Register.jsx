import React from 'react';
import propTypes from 'prop-types';
import { Box, FormControl, FormHelperText, FormLabel, Typography, useTheme } from '@mui/material';
import CenteredBox from '../molecules/CenteredBox';
import { FormattedMessage } from 'react-intl';
import Input from '../atoms/Input';
import { Link } from 'react-router-dom';
import routes from '../../routing/routes';
import { makeStyles } from '@mui/styles';
import Button from '../atoms/Button';

const useLabelStyles = makeStyles((theme) => ({
  focused: {
    color: theme.palette.primary.strong,
  },
}));

function RegisterTemplate({ form, loading }) {
  const theme = useTheme();
  const labelClasses = useLabelStyles();

  return (
    <CenteredBox>
      <Box width="450px">

        <Box textAlign="center" mb="10px">
          <Typography variant="h1" color={theme.palette.primary.main}>
            <FormattedMessage id="Register.title"/>
          </Typography>
        </Box>

        <Box whiteSpace="pre-wrap" textAlign="center" mb="10px" >
          <Typography variant="body1">
            <FormattedMessage id="Register.subtitle"/>
          </Typography>
        </Box>

        <form onSubmit={form.handleSubmit} method="post">
          <FormControl required fullWidth margin="normal">
            <FormLabel classes={labelClasses} htmlFor="name">
              <FormattedMessage id="Register.labels.name" />
            </FormLabel>
            <Input
              fullWidth
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              name="name"
            />
          </FormControl>
          {form.errors?.name && form.touched?.name && (
            <FormHelperText error data-testid="error-email">
              {form.errors.name}
            </FormHelperText>
          )}
          <FormControl required fullWidth margin="normal">
            <FormLabel classes={labelClasses} htmlFor="email">
              <FormattedMessage id="Register.labels.email" />
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
              <FormattedMessage id="Register.labels.password" />
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
              <FormattedMessage id="Register.login.text" />
              <span>
                <Link to={routes.login.path}><FormattedMessage id="Register.login.link" /></Link>
              </span>
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="primary"
            type="submit"
            disabled={!!form.errors?.email || !!form.errors?.password || !!form.errors?.name}
            isLoading={loading}
          >
            <FormattedMessage id="Register.cta.register" />
          </Button>
        </form>

      </Box>
    </CenteredBox>
  );
}

RegisterTemplate.propTypes = {
  form: propTypes.shape({
    handleSubmit: propTypes.func,
    handleChange: propTypes.func,
    values: propTypes.shape({
      name: propTypes.string,
      email: propTypes.string,
      password: propTypes.string,
    }),
  }),
  loading: propTypes.bool,
};

RegisterTemplate.defaultProps = {
  form: {},
  loading: false,
};

export default RegisterTemplate;
