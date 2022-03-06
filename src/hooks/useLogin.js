import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    // reset error/isPending everytime the user signup
    setError(null);
    setIsPending(true);

    // sign user out
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

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

  return { error, isPending, login };
};
