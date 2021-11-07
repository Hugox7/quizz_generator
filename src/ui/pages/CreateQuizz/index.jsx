import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchQuizzThunk } from '../../../redux/actions/quizzActions';
import { useSelector } from 'react-redux';
import { currentQuizzSelector, isQuizzLoadingSelector } from '../../../redux/selectors/quizzSelectors';
import CenteredCircularProgress from '../../molecules/CenteredCircularProgress';
import CreateQuizzHeader from './CreateQuizzHeader';

function CreateQuizz() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const quizz = useSelector(currentQuizzSelector);
  const isLoading = useSelector(isQuizzLoadingSelector);

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

  return (
    <Box>
      <CreateQuizzHeader quizz={quizz} />
    </Box>
  );
}

export default CreateQuizz;
