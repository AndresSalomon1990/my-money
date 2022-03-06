import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
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

      // update state only if the component is mounted
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      // update state only if the component is mounted
      if (!isCancelled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  // clean up function to avoid updating the state if the component unmount
  // while an async process is ongoing
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, logout };
};
