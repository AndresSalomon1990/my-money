import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // reset error/isPending everytime the user signup
    setError(null);
    setIsPending(true);

    // sign user out
    try {
      await projectAuth.signOut();

      // dispatch logout actioN
      // not necessary to add a payload as the user will be null when logging out
      dispatch({ type: 'LOGOUT' });

      setError(null);
      setIsPending(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, logout };
};
