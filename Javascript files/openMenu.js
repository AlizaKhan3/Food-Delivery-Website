import { db, collection, getDocs, where, query, doc, getDoc } from "./firebase.js"

var urlParams = new URLSearchParams(window.location.search);
let pageSpinner = document.getElementById("page-spinner");
let mainContent = document.getElementById("main-content");

const getRestaurantDetails = async () => {
    const resToast = document.getElementById("res-toast");
    const resName = document.getElementById("res-name");
    const resAddress = document.getElementById("res-address");
    const resImage = document.getElementById("res-image");

    const docRef = doc(db, "restaurants", urlParams.get('restaurant'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        resToast.innerHTML = docSnap.data().name;
        resName.innerHTML = docSnap.data().name;
        resAddress.innerHTML = docSnap.data().address;
        resImage.src = docSnap.data().image;

        console.log("Document data", docSnap.data());
    } else {
        console.log("No Document data");
    }
}
getRestaurantDetails();

const getAllDishes = async () => {
    const allDishes = document.getElementById("all-dishes");
    const q = query(collection(db, "dishes"), where('restaurant', "==", urlParams.get('restaurant')));
    console.log(urlParams.get('restaurant'))

    const querySnapshot = await getDocs(q);
    pageSpinner.style.display = "none";
    mainContent.style.display = "block";
    allDishes.innerHTML = ``
    querySnapshot.forEach((doc) => {
        allDishes.innerHTML += `
         <div class="col-md-4 col-sm-6 col-12 mb-3">
        <div class="card dish-card shadow-lg">
          <img src="https://www.eatthis.com/wp-content/uploads/sites/4/2022/03/chickensalad.jpg"
            class="card-img-top img-fluid rounded-top" alt="Menu Image">
          <div class="card-body">
            <h5 class="card-title" id="menu-title" style="font-weight: bold;">${doc.data().name}</h5>
            <p class="card-text my-2" id="menu-text" style="color: #666;">Classic chicken salad with lettuce, tomato, and
              mayo</p>
            <p class="card-text my-2" id="menu-text" style="color: #666;">Serving size: 1 person</p>
            <p class="card-text my-1" id="menu-text" style="color: #e44e3f;">$10.99</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="qty-btn-group">
                <button onclick="updateQty('-')" class="btn btn-sm btn-secondary"><i class="fa-solid fa-minus"></i></button>
                <span class="fw-bold"> 1 </span>
                <button onclick="updateQty('+')" class="btn btn-sm btn-secondary"><i class="fa-solid fa-plus"></i></button>
              </div>
              <a href="#" class="btn btn-sm btn-primary" onclick="addToCart()">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
        `
    });
};

getAllDishes();

const updateQty = (type) => {
    console.log(event.target);
   console.log(type);
}

window.updateQty = updateQty;




/* <div class="container-fluid py-5">
  <div class="row justify-content-center">
    <div class="col-md-4 col-sm-6 col-12 mb-3">
      <div class="card dish-card shadow-lg">
        <img src="${doc.data().image}" class="card-img-top img-fluid rounded-top" alt="Menu Image">
        <div class="card-body">
          <h5 class="card-title" id="menu-title" style="font-weight: bold;">${doc.data().name}</h5>
          <p class="card-text my-2" id="menu-text" style="color: #666;">${doc.data().description}</p>
          <p class="card-text my-2" id="menu-text" style="color: #666;">${doc.data().serving}</p>
          <p class="card-text my-1" id="menu-text" style="color: #e44e3f;">${doc.data().price}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="qty-btn-group">
              <button onclick="updateQty('-')" class="btn btn-sm btn-secondary"><i class="fa-solid fa-minus"></i></button>
              <span class="fw-bold"> 1 </span>
              <button onclick="updateQty('+')" class="btn btn-sm btn-secondary"><i class="fa-solid fa-plus"></i></button>
            </div>
            <a href="#" class="btn btn-sm btn-primary" onclick="addToCart('${doc.id}')">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */