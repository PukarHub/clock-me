import firebase from 'firebase';
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBGfmp4JhJ86Owb-7d4i8eiqtXdTQ2q3ps",
    authDomain: "clock-me-55537.firebaseapp.com",
    projectId: "clock-me-55537",
    storageBucket: "clock-me-55537.appspot.com",
    messagingSenderId: "981735462879",
    appId: "1:981735462879:web:6b3f17b4a0c9653e6d166a"
  }).auth();