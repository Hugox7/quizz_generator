import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import useCreateQuizzContext from './useCreateQuizzContext';
import { FormattedMessage } from 'react-intl';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { object, string, array, number, boolean } from 'yup';
import Input from '../../atoms/Input';
import useTranslate from '../../../hooks/useTranslate';
import Button from '../../atoms/Button';

function CreateQuizzDialog() {
  const { t } = useTranslate();
  const { quizz, isDialogOpen, setDialogOpen } = useCreateQuizzContext();

  // update mode
  const currentQuestion = 'string' === typeof isDialogOpen && quizz.QuizzQuestions
    .find(({ publicId }) => publicId === isDialogOpen);

  const formik = useFormik({
    initialValues: {
      question: currentQuestion?.question || '',
      options:  [
        { id: 1, option: '', isEligible: false },
        { id: 2, option: '', isEligible: false },
      ],
    },
    validationSchema: object().shape({
      question: string().required(t('CreateQuizz.dialog.validations.question.required')),
      options: array().of(
        object().shape({
          option: string().required(),
          isEligible: boolean().required(),
        }),
      ).min(2),
    }),
    onSubmit: (values) => {
      // TODO
    }
  });

  // let isDisabled;
  // if ()

  return (
    <Dialog
      open={!!isDialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="space-between">
          <FormattedMessage
            id={ typeof isDialogOpen === 'boolean' ? "CreateQuizz.dialog.titleAdd" : "CreateQuizz.dialog.titleUpdate"}
          />
          <CloseIcon style={{ cursor: 'pointer' }} onClick={() => {
              setDialogOpen(false);
            }}
          />
        </Box>
        <DialogContent>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} method="post">
              <FormControl required fullWidth margin="normal">
                <FormLabel htmlFor="question">
                  <FormattedMessage id="CreateQuizz.dialog.labels.question" />
                </FormLabel>
                <Input
                  fullWidth
                  value={formik.values.question}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="question"
                />
              </FormControl>
              {formik.errors?.question && formik.touched?.question && (
                <FormHelperText error data-testid="error-question">
                  {formik.errors.question}
                </FormHelperText>
              )}
              <Box mt="40px">
                <FieldArray name="options">
                  {({ push, remove }) => (
                    <>
                      {formik.values.options.map((e, i) => {
                        return (
                          <Box key={i} display="flex" alignItems="center">
                            <Box width="70%" mr="30px">
                              <FormControl fullWidth required margin="normal">
                                <FormLabel htmlFor="option">
                                  <FormattedMessage id="CreateQuizz.dialog.labels.option" />
                                </FormLabel>
                                <Input
                                  fullWidth
                                  value={e.option}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  name={`options[${i}].option`}
                                />
                              </FormControl>
                            </Box>
                            <FormControl margin="normal">
                              <FormLabel htmlFor="isEligible">
                                <FormattedMessage id="CreateQuizz.dialog.labels.eligible" />
                              </FormLabel>
                              <Switch
                                checked={e.isEligible}
                                name={`options[${i}].isEligible`}
                                onChange={formik.handleChange}
                              />
                            </FormControl>
                            <Box ml="30px" mt="35px">
                              <DeleteIcon
                                color="warning" style={{ cursor: 'pointer' }}
                                onClick={() => remove(i)}
                              />
                            </Box>
                          </Box>
                        );
                      })}
                      <Box mt="40px" width="70%">
                        <Button fullWidth variant="outlined" onClick={() => push({ id: formik.values.options.length + 1, option: '', isEligible: false })}>
                          {t("CreateQuizz.dialog.addOption")}
                        </Button>
                      </Box>
                    </>
                  )}
                </FieldArray>
              </Box>
              <Box display="flex" mt="35px" justifyContent="flex-end">
                <Button disabled={!formik.isValid}>Enregistrer</Button>
              </Box>
            </form>
          </FormikProvider>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );

}

export default CreateQuizzDialog;
