import {auth, signInWithEmailAndPassword, collection, db, getDocs} from "./Javascript files/firebase.js"

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

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



// Show restaurants on home page
const getAllRestaurants = async () => {
  const resList = document.getElementById("res-list");
  resList.innerHTML = "";
  const q = collection(db, "restaurants");
  const querySnapshot = await getDocs(q);
  let index = 0;
  querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      // index++
      resList.innerHTML += `
                 <div class="col">
          <div class="card h-100">
           <a  href="dishes.html?restaurant=${doc.id}> <img src="${doc.data().image}"
            class="card-img-top" alt="..."></a>
            <div class="card-body">
              <a href="dishes.html?restaurant=${doc.id}" id="rest-display-card"><h5 class="card-title">${doc.data().name}</h5></a>
              <p class="card-text">
                <span class="badge text-bg-primary">Fastfood</span>
                <span class="badge text-bg-primary">Drinks</span>
              </p>
            </div>
          </div>
        </div>
      `
  });
}
getAllRestaurants();
