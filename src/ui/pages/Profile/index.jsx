import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import { currentUserSelector } from '../../../redux/selectors/authSelectors';
import ProfileTemplate from './ProfileTemplate';
import ApiService from '../../../api/apiService';
import useToast from '../../../hooks/useToast';
import usePrevious from '../../../hooks/usePrevious';
import { AUTH_ACTIONS } from '../../../redux/reducers/authReducer';
import ProfileContext from './Context';
import useTranslate from '../../../hooks/useTranslate';
import { useFormik } from 'formik';

function Profile() {
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const toast = useToast();
  const user = useSelector(currentUserSelector);

  const [file, setFile] = useState(null);
  const [isReadOnly, setReadOnly] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const previousFile = usePrevious(file);

  const handleProfilePicUpload = useCallback(async (file) => {
    const formData = new FormData();
    formData.append('profile-pic', file);

    try {
      const { data: updatedUser } = await ApiService.post('/user/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser });
      toast(t("Profile.upload.success"), "success");
    } catch {
      toast(t("Profile.upload.failed"));
    } finally {
      setFile(null);
    }
  }, [dispatch, t, toast]);

  useEffect(() => {
    if (!previousFile && file) {
      handleProfilePicUpload(file);
    }
  }, [file, handleProfilePicUpload, previousFile]);

  const updateProfileForm = useFormik({
    initialValues: {
      name: user?.name,
      bio: user?.bio,
      email: user?.email,
    },
    validationSchema: object().shape({
      name: string()
        .min(3, t('Profile.validations.name.min'))
        .required(t('Profile.validations.name.required')),
      bio: string(),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        const { data: updatedUser } = await ApiService.put('/user/update', values);
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser });
        toast(t('Profile.toast.success'), 'success');
        setReadOnly(true);
      } catch {
        toast(t('Profile.toast.failed'));
      } finally {
        setSubmitting(false);
      }
    },
  });


  const contextValue = {
    user,
    setFile,
    isReadOnly,
    setReadOnly,
    updateProfileForm,
    submitting,
    isProfileContext: true,
  };

  return (
    <Box p="20px">
      <ProfileContext.Provider value={contextValue}>
        <ProfileTemplate />
      </ProfileContext.Provider>
    </Box>
  );
}

export default Profile;
