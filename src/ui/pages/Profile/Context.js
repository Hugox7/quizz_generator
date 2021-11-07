import React from 'react';

// The context of the profile page and its children
export default React.createContext({
  user: {},
  setFile: () => {},
  isReadOnly: true,
  setReadOnly: () => {},
  updateProfileForm: {},
  submitting: false,
  isProfileContext: false,
});
