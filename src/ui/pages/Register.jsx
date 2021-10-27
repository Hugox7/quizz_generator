import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { userColors } from '../../constants/avatarColors';
import { useHistory } from 'react-router-dom';
import routes from '../../routing/routes';
import useToast from '../../hooks/useToast';
import useTranslate from '../../hooks/useTranslate';
import ApiService from '../../api/apiService';
import RegisterTemplate from '../templates/Register';

function Register() {
  const history = useHistory();
  const toast = useToast();
  const { t } = useTranslate();
  const [submitting, setSubmitting] = useState(false);

  const registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: object().shape({
      name: string()
        .min(3, t('Register.validations.name.min'))
        .required(t('Register.validations.name.required')),
      email: string()
        .email(t('Register.validations.email.format'))
        .required(t('Register.validations.email.required')),
      password: string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t('Register.validations.password.matches'))
        .required(t('Register.validations.password.required')),
    }),
    onSubmit: async ({ name, email, password }) => {
      setSubmitting(true);
      try {
        const color = userColors[Math.floor(Math.random() * userColors.length)]
        await ApiService.postWithoutJwt('user/register', { name, email, password, color });
        history.push(routes.login.path);
        toast(t('Register.toast.success'), 'success');
      } catch (error) {
        setSubmitting(false);
        if (error.response.status === 403) {
          toast(t(`Register.toast.failed.error403`));
          return;
        }
        toast(t(`Register.toast.failed.error500`));
      }
    },
  });


  return <RegisterTemplate form={registerForm} loading={submitting} />;
}

export default Register;
