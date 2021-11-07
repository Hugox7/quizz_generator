import React from 'react';
import propTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/styles';
import Button from '../../atoms/Button';
import { Link } from 'react-router-dom';
import QuizzStatusTag from './QuizzStatusTag';

function CreateQuizzHeader({ quizz }) {
  const theme = useTheme();

  return (
    <Box
      height="90px"
      borderBottom={`1px solid ${theme.palette.neutral.secondary}`}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="20px"
    >
      <Box display="flex" alignItems="center">
        {/* TODO */}
        <Button component={Link} to='#' startIcon={<ArrowBackIcon />} variant="outlined">
          {/* TODO */}
          Retour
        </Button>
        <Box ml="10px">
          <Typography variant="bodyBold">
            {quizz.name}
          </Typography>
          <QuizzStatusTag quizz={quizz} />
        </Box>
      </Box>
    </Box>
  );
}

CreateQuizzHeader.propTypes = {
  quizz: propTypes.shape({
    name: propTypes.string,
  }).isRequired,
};

export default CreateQuizzHeader;
