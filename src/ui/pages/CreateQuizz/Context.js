import React from 'react';

// The context of the create quizz page and its children
export default React.createContext({
  quizz: {},
  isDialogOpen: false,
  setDialogOpen: () => {},
  isCreateQuizzContext: false,
});
