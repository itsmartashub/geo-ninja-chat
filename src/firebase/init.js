import * as firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCj44LE4AgyYevpYDBmhCCAobzWU0vdy3U",
    authDomain: "geo-ninja-chat.firebaseapp.com",
    databaseURL: "https://geo-ninja-chat.firebaseio.com",
    projectId: "geo-ninja-chat",
    storageBucket: "geo-ninja-chat.appspot.com",
    messagingSenderId: "209739427038",
    appId: "1:209739427038:web:ac05c98709e4ca9e"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()