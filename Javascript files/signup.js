import {auth, createUserWithEmailAndPassword,db, RecaptchaVerifier, signInWithEmailAndPassword, googleProvider, signInWithPopup, GoogleAuthProvider, facebookAuthProvider, facebookProvider, SignInWithPhoneNumber, doc, setDoc} from "./firebase.js";

let confirmation;

const register = ( ) => {
    const phone = document.getElementById("phone");
    window.RecaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    const appVerifier = window.recaptchaVerifier;
    console.log("phone-->", phone.value);
    SignInWithPhoneNumber(auth, `+${phone.value}`, appVerifier)
    .then((confirmationResult) => {
        console.log("sms sent to the user");
         confirmation = confirmationResult;
    }).catch((error) => {
        console.log("error message: ", error)
    });    
}


let signInWithGoogle = () => {
signInWithPopup(auth, googleProvider)
 .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}
 


  
// const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});



let addUserToFirestor = async () => {
    const data = await setDoc(doc(db, "users", user.uid), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })

}