import React from 'react';
import { Box } from '@mui/material';
import DataBlock from '../../molecules/DataBlock';
import useProfileContext from './useProfileContext';
import useTranslate from '../../../hooks/useTranslate';
import Button from '../../atoms/Button';

function ProfileReadOnlyMode() {
  const { t, date } = useTranslate();
  const { user, setReadOnly } = useProfileContext();

  return (
    <Box>
      <DataBlock mb="40px" label={t('Profile.readOnly.mail')} value={user?.email} />
      <DataBlock mb="40px" label={t('Profile.readOnly.name')} value={user?.name} />
      <DataBlock mb="40px" label={t('Profile.readOnly.bio')} value={user?.bio} />
      <DataBlock
        mb="40px"
        label={t('Profile.readOnly.createdAt')}
        value={date(user?.createdAt)}
      />
      <Button onClick={() => setReadOnly(false)} variant="outlined">{t('Profile.readOnly.update')}</Button>
    </Box>
  );
}

export default ProfileReadOnlyMode;
