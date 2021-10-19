import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import useTranslate from '../../hooks/useTranslate';
import ApiService from '../../api/apiService';
import { jwt } from '../../storage/jwt';
import { useDispatch } from 'react-redux';
import { initializeAuthThunk } from '../../redux/actions/authActions';
import LoginTemplate from '../templates/Login';

function Login() {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

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
      submitError && setSubmitError(false);
      setSubmitting(true);
      try {
        const { data: userData } = await ApiService.postWithoutJwt('user/login', { email, password });
        jwt.set(userData.token);
        dispatch(initializeAuthThunk());
      } catch (err) {
        setSubmitError(true);
        setSubmitting(false);
      }
    },
  });

  return <LoginTemplate form={loginForm} error={submitError} loading={submitting} />;
}

export default Login;
