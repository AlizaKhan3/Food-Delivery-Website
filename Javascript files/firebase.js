import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

      
const firebaseConfig = {
  apiKey: "AIzaSyDzpnkFF0DiZ32MVAUaMiTEu83A7QAUnx8",
  authDomain: "onlinefood-7799a.firebaseapp.com",
  projectId: "onlinefood-7799a",
  storageBucket: "onlinefood-7799a.appspot.com",
  messagingSenderId: "119235898205",
  appId: "1:119235898205:web:9a6ca0302608a92a7556b4"
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
