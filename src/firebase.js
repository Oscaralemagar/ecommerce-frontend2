//import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
 
 // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPbhGRJgqPt4j_5hZLb8rPW3lmD1wPAcE",
    authDomain: "ecommerce-80231.firebaseapp.com",
    projectId: "ecommerce-80231",
    storageBucket: "ecommerce-80231.appspot.com",
    messagingSenderId: "116335087098",
    appId: "1:116335087098:web:3d8febfc795e20601c6843"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // export
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();