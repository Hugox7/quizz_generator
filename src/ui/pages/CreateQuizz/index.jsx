import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchQuizzThunk } from '../../../redux/actions/quizzActions';
import { useSelector } from 'react-redux';
import { currentQuizzSelector, isQuizzLoadingSelector } from '../../../redux/selectors/quizzSelectors';
import CenteredCircularProgress from '../../molecules/CenteredCircularProgress';
import CreateQuizzTemplate from './CreateQuizzTemplate';
import CreateQuizzContext from './Context';
import { useFormik } from 'formik';
import { object, string, array, number } from 'yup';

function CreateQuizz() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const quizz = useSelector(currentQuizzSelector);
  const isLoading = useSelector(isQuizzLoadingSelector);

  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchQuizzThunk(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (!quizz) {
    // TODO handle error
    return 'no quizz';
  }

  const contextValue = {
    quizz,
    isDialogOpen,
    setDialogOpen,
    isCreateQuizzContext: true,
  }

  return (
    <Box>
      <CreateQuizzContext.Provider value={contextValue}>
        <CreateQuizzTemplate />
      </CreateQuizzContext.Provider>
    </Box>
  );
}

export default CreateQuizz;
