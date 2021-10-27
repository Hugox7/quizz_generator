import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import useTranslate from '../../hooks/useTranslate';
import ApiService from '../../api/apiService';
import { jwt } from '../../storage/jwt';
import { useDispatch } from 'react-redux';
import { initializeAuthThunk } from '../../redux/actions/authActions';
import LoginTemplate from '../templates/Login';
import useToast from '../../hooks/useToast';

function Login() {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: object().shape({
      email: string()
        .email(t('Login.validations.email.format'))
        .required(t('Login.validations.email.required')),
      password: string().required(t('Login.validations.password.required')),
    }),
    onSubmit: async ({ email, password }) => {
      setSubmitting(true);
      try {
        const { data: userData } = await ApiService.postWithoutJwt('user/login', { email, password });
        jwt.set(userData.token);
        dispatch(initializeAuthThunk());
      } catch (error) {
        setSubmitting(false);
        if (error.response.status === 403) {
          toast(t('Login.errors.credentials'));
          return;
        }
        toast(t('Login.errors.error500'));
      }
    },
  });

  return <LoginTemplate form={loginForm} loading={submitting} />;
}

export default Login;
