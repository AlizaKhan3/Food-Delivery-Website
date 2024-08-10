const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

import {auth, signInWithEmailAndPassword} from "./Javascript files/firebase.js"

const login = () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  console.log(email.value, password.value)

  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    if (user.email == "admin@gmail.com") {
      window.location.href = "./dashboard.html";
    }
    
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}
 
const loginBtn = document.getElementById("loginBtn");
loginBtn && loginBtn.addEventListener('click', login);