import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD58QK4lL52xv_WTNcmwtsaB0q1RIozZJU",
  authDomain: "vue-super.firebaseapp.com",
  projectId: "vue-super",
  storageBucket: "vue-super.appspot.com",
  messagingSenderId: "732275062308",
  appId: "1:732275062308:web:148acb8bfe7cff82c20ab1",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export default db;
export { auth, provider, storage, db };
