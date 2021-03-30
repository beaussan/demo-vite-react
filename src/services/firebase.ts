import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyAi8bQfMEzAMYaCmf2ZMrcW9WRx9_pW6Q0',
  authDomain: 'fir-hasura-4c116.firebaseapp.com',
  projectId: 'fir-hasura-4c116',
  storageBucket: 'fir-hasura-4c116.appspot.com',
  messagingSenderId: '550585100922',
  appId: '1:550585100922:web:aeba7460442924f908a9c3',
};

export const app = firebase.initializeApp(firebaseConfig);
export const fn = app.functions('europe-west1');
export const auth = app.auth();
export const db = app.firestore();

export const refreshTokenFn = fn.httpsCallable('refreshToken');
