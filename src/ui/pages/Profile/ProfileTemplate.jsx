import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Button from '../../atoms/Button';
import { useTheme } from '@mui/styles';
import useProfileContext from './useProfileContext';
import ProfileReadOnlyMode from './ProfileReadOnlyMode';
import useTranslate from '../../../hooks/useTranslate';
import ProfileEditMode from './ProfileEditMode';

function ProfileTemplate() {
  const theme = useTheme();
  const { t } = useTranslate();
  const { user, setFile, isReadOnly } = useProfileContext();

  const profilePicStyle = {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    verticalAlign: 'middle',
  };

  return (
    <Grid pt="40px" container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Box height="500px" display="flex" flexDirection="column" alignItems="center">
          {user.profilePic ? (
            <>
              <Box
                mb="10px"
                height="350px"
                width="250px"
                overflow="hidden"
                borderRadius="5px"
              >
                <img style={profilePicStyle} src={user.profilePic} alt="profile pic" />
              </Box>
              <Box width="250px">
                <Button variant="primary" component="label" fullWidth>
                  {t("Profile.pic.update")}
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    hidden
                  />
                </Button>
                <Typography variant="subtitle">
                  {t('Profile.upload.warning')}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box
                height="350px"
                width="250px"
                border={`2px dashed ${theme.palette.neutral.tertiary}`}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button variant="primary" component="label">
                  {t("Profile.pic.add")}
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    hidden
                  />
                </Button>
              </Box>
              <Box width="250px">
                <Typography variant="subtitle">{t('Profile.upload.warning')}</Typography>
              </Box>
            </>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Box height="500px" display="flex" justifyContent="center">
          {isReadOnly ? <ProfileReadOnlyMode /> : <ProfileEditMode />}
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfileTemplate;
