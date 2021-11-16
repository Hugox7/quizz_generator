import React from 'react';
import { useTheme } from '@mui/styles';
import FullScreenBox from '../../molecules/FullScreenBox';
import useCreateQuizzContext from './useCreateQuizzContext';
import CreateQuizzHeader from './CreateQuizzHeader';
import { Box, Typography } from '@mui/material';
import Button from '../../atoms/Button';
import { FormattedMessage } from 'react-intl';
import CreateQuestionDialog from './CreateQuestionDialog';

function CreateQuizzTemplate() {
  const theme = useTheme();
  const { quizz, isDialogOpen, setDialogOpen } = useCreateQuizzContext();

  return (
    <FullScreenBox backgroundColor={theme.palette.common.white}>
      <CreateQuizzHeader />
      {quizz.QuizzQuestions.length ? (
        <p>coucou</p>
      ) : (
        <Box px="20px" textAlign="center" pt="60px">
          <Box mb="20px">
            <Typography variant="bodyTitle">
              <FormattedMessage id="CreateQuizz.addFirstQuestion" />
            </Typography>
          </Box>
          <Button onClick={() => setDialogOpen(true)} variant="outlined">
            <FormattedMessage id="CreateQuizz.cta.add" />
          </Button>
        </Box>
      )}
      {isDialogOpen && <CreateQuestionDialog />}
    </FullScreenBox>
  );
}

export default CreateQuizzTemplate;
