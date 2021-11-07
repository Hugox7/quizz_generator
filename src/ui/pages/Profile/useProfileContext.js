import { useContext } from 'react';
import profileContext from './Context';

function useProfileContext() {
  const {
    user,
    setFile,
    isReadOnly,
    setReadOnly,
    updateProfileForm,
    submitting,
    isProfileContext
  } = useContext(profileContext);

  if (!isProfileContext) {
    throw new Error('This hook must be used within profile context provider');
  }

  return { user, setFile, isReadOnly, setReadOnly, updateProfileForm, submitting };
}

export default useProfileContext;
