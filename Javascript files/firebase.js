import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

      
const firebaseConfig = {
  apiKey: "AIzaSyADIRUGIYrAtNwt3HRrT4WU2pLRFaKxivk",
  authDomain: "onifood-pk.firebaseapp.com",
  projectId: "onifood-pk",
  storageBucket: "onifood-pk.appspot.com",
  messagingSenderId: "540168170457",
  appId: "1:540168170457:web:ef12dcf1d487057a1687c8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export{
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
}
