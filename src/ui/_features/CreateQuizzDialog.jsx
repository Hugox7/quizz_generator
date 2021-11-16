import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useFormik } from 'formik';
import { Box, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel } from '@mui/material';
import { object, string, number } from 'yup';
import useTranslate from '../../hooks/useTranslate';
import { FormattedMessage } from 'react-intl';
import Input from '../atoms/Input';
import ApiService from '../../api/apiService';
import CloseIcon from '@mui/icons-material/Close';
import useToast from '../../hooks/useToast';
import { useHistory } from 'react-router-dom';
import routes from '../../routing/routes';
import { routeWithParams } from '../../utils/route';
import { useDispatch } from 'react-redux';
import { setTypesThunk } from '../../redux/actions/typeActions';
import { useSelector } from 'react-redux';
import { typesSelector } from '../../redux/selectors/typeSelectors';
import Button from '../atoms/Button';

function CreateQuizzDialog({ open, handleClose }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslate();
  const toast = useToast();

  const types = useSelector(typesSelector);

  // const [types, setTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
      type: '',
    },
    validationSchema: object().shape({
      name: string().required(t('CreateQuizzDialog.validation')),
      description: string(),
      type: number()
        .transform((value) => Number.isNaN(value) ? 0 : value)
        .required(t('CreateQuizzDialog.validation')),
    }),
    onSubmit: async ({ name, description, type }) => {
      setSubmitting(true);
      try {
        const { data: quizzCreated } = await ApiService.post('/quizz', { name, description, type });
        history.push(routeWithParams(routes.createQuizz.path, { id: quizzCreated.publicId }));
        handleClose();
        toast(t('CreateQuizzDialog.submit.success'), 'success');
      } catch {
        setSubmitting(false);
        toast(t('CreateQuizzDialog.submit.failed'));
      }
    },
  });

  useEffect(() => {
    dispatch(setTypesThunk());
  }, [dispatch]);

  const selectItems = types.map(({ id, name }) => ({ id, name: t('Common.quizzTypes', { type: name }) }));

  const isDisabled = Boolean(errors?.name) || Boolean(errors?.type) || !values.type || !values.name;

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        resetForm();
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="space-between">
          <FormattedMessage id="CreateQuizzDialog.title" />
          <CloseIcon style={{ cursor: 'pointer' }} onClick={() => {
              handleClose();
              resetForm();
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} method="post">
          <FormControl required fullWidth margin="normal">
            <FormLabel htmlFor="name">
              <FormattedMessage id="CreateQuizzDialog.labels.name" />
            </FormLabel>
            <Input
              fullWidth
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
            />
          </FormControl>
          {errors?.name && touched?.name && (
            <FormHelperText error data-testid="error-name">
              {errors.name}
            </FormHelperText>
          )}
          <FormControl fullWidth margin="normal">
            <FormLabel htmlFor="description">
              <FormattedMessage id="CreateQuizzDialog.labels.description" />
            </FormLabel>
            <Input
              text
              fullWidth
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              name="description"
            />
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <FormLabel htmlFor="type">
              <FormattedMessage id="CreateQuizzDialog.labels.type" />
            </FormLabel>
            <Input
              select
              fullWidth
              items={selectItems}
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              name="type"
            />
          </FormControl>
          {errors?.type && touched?.type && (
            <FormHelperText error data-testid="error-type">
              {errors.type}
            </FormHelperText>
          )}
          <Box mt="20px" display= "flex" justifyContent="flex-end">
            <Button fullWidth variant="primary" type="submit" disabled={isDisabled} isLoading={submitting}>
              <FormattedMessage id="CreateQuizzDialog.cta.continue" />
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

CreateQuizzDialog.propTypes = {
  open: propTypes.bool,
  handleClose: propTypes.func,
};

CreateQuizzDialog.defaultProps = {
  open: false,
  handleClose: () => {},
};

export default CreateQuizzDialog;
