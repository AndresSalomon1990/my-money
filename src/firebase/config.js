import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC_xIHZG8tCr32Wxjuwpk2eSBagPFK8xb4',
  authDomain: 'mymoney-d72c8.firebaseapp.com',
  projectId: 'mymoney-d72c8',
  storageBucket: 'mymoney-d72c8.appspot.com',
  messagingSenderId: '689882788056',
  appId: '1:689882788056:web:623b77ce947d568c46a7ad',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth(); // use JWT

// timestamp - return a function
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
