import { auth, signInWithEmailAndPassword, collection, db, getDocs, onAuthStateChanged } from "./Javascript files/firebase.js"

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
  const pageSpinner = document.getElementById("page-spinner");
  const resList = document.getElementById("res-list");

  if (pageSpinner && resList) {
    pageSpinner.style.display = "block";
    resList.innerHTML = "";

    const q = collection(db, "restaurants");
    const querySnapshot = await getDocs(q);

    pageSpinner.style.display = "none";

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      resList.innerHTML += `
        <div class="col">
          <div class="card" h-100">
            <img src="${doc.data().image}"
                class="card-img-top" alt="..." loading="lazy">
            <div class="card-body">
              <a href="dishes.html?restaurant=${doc.id}"><h5 class="card-title" id="rest-display-card">${doc.data().name}</h5></a>
              <p class="card-text">
                <span class="badge badge-color text-bg-primary">Fastfood</span>
                <span class="badge badge-color text-bg-primary">Drinks</span>
              </p>
            </div>
          </div>
        </div>
      `;
    });
  }
};

onAuthStateChanged(auth,(user) => {
  if ((user && location.pathname.indexOf("restaurants") !== -1) || location.pathname === "/" ) {
    getAllRestaurants();  
    console.log("hogaya ab sahi load")
  }
  // getAllRestaurants();
})
getAllRestaurants();  