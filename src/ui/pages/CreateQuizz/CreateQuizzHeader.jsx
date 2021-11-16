import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/styles';
import Button from '../../atoms/Button';
import { Link } from 'react-router-dom';
import QuizzStatusTag from './QuizzStatusTag';
import useCreateQuizzContext from './useCreateQuizzContext';
import { FormattedMessage } from 'react-intl';

function CreateQuizzHeader() {
  const theme = useTheme();
  const { quizz } = useCreateQuizzContext();

  return (
    <Box
      height="90px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="20px"
      boxShadow="0px 2px 10px rgba(75, 50, 138, 0.07)"
      mb="40px"
    >
      <Box display="flex" alignItems="center">
        <Button variant="outlined" startIcon={<ArrowBackIcon />}>
          <FormattedMessage id="CreateQuizz.header.back" />
        </Button>
        <Box mx="20px">
          <Typography variant="bodyBold">
            {quizz.name}
          </Typography>
        </Box>
        <QuizzStatusTag quizz={quizz} />
      </Box>
      <Button disabled={!quizz.QuizzQuestions?.length}>
        <FormattedMessage id="CreateQuizz.header.publish" />
      </Button>
    </Box>
  );
}

export default CreateQuizzHeader;
