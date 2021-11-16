import { useContext } from 'react';
import createQuizzContext from './Context';

function useCreateQuizzContext() {
  const {
    quizz,
    isDialogOpen,
    setDialogOpen,
    isCreateQuizzContext,
  } = useContext(createQuizzContext);

  if (!isCreateQuizzContext) {
    throw new Error('This hook must be used within createQuizz context provider');
  }

  return { quizz, isDialogOpen, setDialogOpen };
}

export default useCreateQuizzContext;
