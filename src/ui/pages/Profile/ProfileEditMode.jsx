import React from 'react';
import { Box, FormControl, FormHelperText, FormLabel } from '@mui/material';
import useProfileContext from './useProfileContext';
import { FormattedMessage } from 'react-intl';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';
import useTranslate from '../../../hooks/useTranslate';

function ProfileEditMode() {
  const { updateProfileForm, setReadOnly, submitting } = useProfileContext();
  const { t } = useTranslate();

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm
  } = updateProfileForm;

  const cancel = () => {
    setReadOnly(true);
    resetForm();
  }

  return (
    <Box>
      <form style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit} method="post">
        <FormControl required fullWidth margin="normal">
          <FormLabel htmlFor="email">
            <FormattedMessage id="Profile.edit.email" />
          </FormLabel>
          <Input
              fullWidth
              value={values.email}
              name="email"
              disabled
            />
        </FormControl>
        <FormControl required fullWidth margin="normal">
          <FormLabel htmlFor="name">
            <FormattedMessage id="Profile.edit.name" />
          </FormLabel>
          <Input
              fullWidth
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
        </FormControl>
          {errors?.name && touched?.name && (
            <FormHelperText error data-testid="error-name">
              {errors.name}
            </FormHelperText>
          )}
        <FormControl fullWidth margin="normal">
          <FormLabel htmlFor="bio">
            <FormattedMessage id="Profile.edit.bio" />
          </FormLabel>
              <Input
                text
                fullWidth
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                name="bio"
              />
        </FormControl>
        <Box mt="20px" display="flex" justifyContent="flex-end">
          <Box mr="5px">
            <Button variant="outlined" onClick={cancel}>
              {t('Profile.edit.cancel')}
            </Button>
          </Box>
          <Button type="submit" variant="primary" isLoading={submitting}>
            {t('Profile.edit.update')}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ProfileEditMode;
