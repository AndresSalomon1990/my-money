import { useState, useEffect, useReducer } from 'react';
import { projectFirestore } from '../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false); // to use it as a clean up function logic

  // collection ref
  const ref = projectFirestore.collection(collection);

  // add a document
  const addDocument = (doc) => {};

  // delete a document
  const deleteDocument = (id) => {};

  // clean up function to avoid updating the state if the component unmount
  // while an async process is ongoing
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
