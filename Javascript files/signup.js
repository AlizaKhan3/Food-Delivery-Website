import {auth, createUserWithEmailAndPassword} from "../Javascript files/firebase.js"

const register = () => {
    // const firstName = document.getElementById("firstName");
    // const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    console.log("User Registered");
    console.log(email.value)

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("user-->", user)
      console.log("hogaya")
    //   window.location.href = "../login.html";
    },3000)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log("errorMessage", errorMessage)
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Something went wrong! " +  errorMessage,
    //   });
    });
}

let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", register);

