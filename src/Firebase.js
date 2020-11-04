import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAePPIc7f4e1ClDFtCEKEpcwevV2DgIAoQ",
  authDomain: "groupeton.firebaseapp.com",
  databaseURL: "https://groupeton.firebaseio.com",
  projectId: "groupeton",
  storageBucket: "groupeton.appspot.com",
  messagingSenderId: "742869524274",
  appId: "1:742869524274:web:dfce126667db815482012b",
  measurementId: "G-YHTY7EGQNC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;