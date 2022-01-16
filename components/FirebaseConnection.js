import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {

  apiKey: "AIzaSyAWAX_w0-WXAGQgHBSB4I-RF1h9qV1_olA",

  authDomain: "tarefas-9d4be.firebaseapp.com",

  projectId: "tarefas-9d4be",

  storageBucket: "tarefas-9d4be.appspot.com",

  messagingSenderId: "988996546267",

  appId: "1:988996546267:web:be2e40c4b7c02e8d2da6fe"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;