import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { doc, setDoc, getFirestore, addDoc, getDocs, getDoc, collection, where, query, serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
// createUserWithEmailAndPassword, signOut, sendEmailVerification, googleProvider, facebookProvider, facebookAuthProvider, RecaptchaVerifier, SignInWithPhoneNumber, GoogleAuthProvider,signInWithPopup 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// auth.languageCode = 'it';
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new facebookAuthProvider();
const storage = getStorage(app);

export{
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  // createUserWithEmailAndPassword,
  // RecaptchaVerifier,
  // SignInWithPhoneNumber,
  // GoogleAuthProvider,
  // googleProvider,
  // signInWithPopup,
  // facebookProvider,
  // facebookAuthProvider,
  doc,
  storage,
  setDoc,
  db,
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
  serverTimestamp
}
