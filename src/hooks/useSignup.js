import { useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    /* firebase auth allows to setup a displayName and/or thumbnail besides email/password
    if more properties are needed, a firestore doc should be created */

    // reset error/isPending everytime the user signup
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        // if there is a problem registering the user
        throw new Error('Could not complete signup');
      }

      // add display name to user
      await res.user.updateProfile({ displayName: displayName });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      setError(null);
      setIsPending(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
