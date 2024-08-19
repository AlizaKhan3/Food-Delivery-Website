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
    const q = query(collection(db, "dishes"), where ('restaurant' , "==", urlParams.get('restaurant')));
    console.log(urlParams.get('restaurant'))

    const querySnapshot = await getDocs(q);
    pageSpinner.style.display = "none";
    mainContent.style.display = "block";
    allDishes.innerHTML = ``
    querySnapshot.forEach((doc) => {
        allDishes.innerHTML += `
        <div class="card dish-card w-100 mb-3">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img class="menu-image"
                        src="${doc.data().image}" />
                    <div class="p-2">
                        <h5 class="card-title" id="menu-title" style="font-weight: bolder;">${doc.data().name}
                                     </h5>
                                    <p class="card-text my-2" id="menu-text" style="color: #787878;">${doc.data().description}</p>
                                    <p class="card-text my-2" id="menu-text" style="color: #787878;">${doc.data().serving}</p>
                                    <p class="card-text my-1" id="menu-text" style="color: #e44e3f;">${doc.data().price}</p>
                                    </p>
                    </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button onclick="updateQty('-','${
                      doc.id
                    }')" class="qty-btn"><i class="fa-solid fa-minus"></i></button>
                    <span class="fw-bold" id="${doc.id}">1</span>
                    <button onclick="updateQty('+','${
                      doc.id
                    }')" class="qty-btn"><i class="fa-solid fa-plus"></i></button>

                    <a href="#" class="btn btn-primary" onclick="addToCart('${
                      doc.id
                    }')">Add to cart</a>
                </div>
            </div>
        </div>
    </div>
        `;
  });
};


getAllDishes();


// allDishes.innerHTML += `
//          <div class="card dish-card mb-3 w-100"> 
//                         <div class="row g-0">
//                             <div class="col-2">
//                                 <img id="menu-image" src="${doc.data().image}"
//                                     alt="...">
//                             </div>
//                             <div class="col">
//                                 <div class="card-body">
//                                     <h5 class="card-title" id="menu-title" style="font-weight: bolder;">${doc.data().name}
//                                     </h5>
//                                     <p class="card-text my-2" id="menu-text" style="color: #787878;">${doc.data().description}</p>
//                                     <p class="card-text my-2" id="menu-text" style="color: #787878;">${doc.data().serving}</p>
//                                     <p class="card-text my-1" id="menu-text" style="color: #e44e3f;">${doc.data().price}</p>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div class="col d-flex justify-content-end align-items-center mx-2 gap-2">
//                                 <button class="qty-btn"><i class="fa-solid fa-minus"></i></button>
//                                 <span class="fw-bold"> 1 </span>
//                                 <button class="qty-btn"><i class="fa-solid fa-plus"></i></button>
//                                 <button class="btn btn-primary cart-btn" type="submit">Add to Cart</button>
//                             </div>
//                         </div>
//                     </div>
//         `