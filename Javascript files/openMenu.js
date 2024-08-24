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
    // console.log("Document data", docSnap.data());
  } else {
    console.log("No Document data");
  }
}
getRestaurantDetails();

let dishes = [];

const getAllDishes = async () => {
  const allDishes = document.getElementById("all-dishes");
  const q = query(collection(db, "dishes"), where('restaurant', "==", urlParams.get('restaurant')));
  console.log(urlParams.get('restaurant'));
  const querySnapshot = await getDocs(q);
  pageSpinner.style.display = "none";
  mainContent.style.display = "block";
  allDishes.innerHTML = ``
  querySnapshot.forEach((doc) => {
    dishes.push({ ...doc.data(), id: doc.id })
    allDishes.innerHTML += `
      <div class="col-lg-6 col-md-12 mb-3">
      <div class="card dish-card shadow-lg">
        <div class="card-body row">
          <div class="col-md-4">
            <img src="${doc.data().image}" class="img-fluid rounded" alt="Menu Image">
          </div>
          <div class="col-md-8">
            <h5 class="card-title" id="menu-title" style="font-weight: bold;">${doc.data().name}</h5>
            <p class="card-text my-2" id="menu-text" style="color: #666;">${doc.data().description}</p>
            <p class="card-text my-2" id="menu-text" style="color: #666;">Serving size: ${doc.data().serving}</p>
            <p class="card-text my-1" id="menu-text" style="color: #e44e3f;">${doc.data().price} Rs</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="qty-btn-group">
                <button onclick="updateQty('-','${doc.id}')" class="btn btn-sm btn-primary qty-btn"><i class="fa-solid fa-minus"></i></button>
                <span class="fw-bold" id="${doc.id}"> 1 </span>
                <button onclick="updateQty('+','${doc.id}')" class="btn btn-sm btn-primary qty-btn"><i class="fa-solid fa-plus"></i></button>
              </div>
              <a href="#" class="btn btn-sm btn-primary" onclick="addToCart('${doc.id}')">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
        `
  });
};

getAllDishes();

const updateQty = (type, id) => {
  const qty = document.getElementById(id);
  if (Number(qty.innerHTML) < 2 && type === "-") {
    return;
  }
  if (type === '+') {
    qty.innerHTML = Number(qty.innerHTML) + 1;
  } else {
    qty.innerHTML = Number(qty.innerHTML) - 1;
  }
}

let totalAmountModal = document.getElementById("total-amount-modal");

const addToCart = (id) => {
  const cartItems = localStorage.getItem('cart');
  let cart = [];
  if (cartItems) {
    try {
      cart = JSON.parse(cartItems);
      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      console.error('Error parsing cart items:', error);
      cart = [];
    }
  }

  const qty = document.getElementById(id);
  const dish = dishes.filter(v => v.id === id);
  cart.push({ ...dish[0], qty: Number(qty.innerHTML) });
  localStorage.setItem('cart', JSON.stringify(cart));
  // const totalSumDisplay = document.getElementById("total-amount-display");
  // const sum = cart.reduce((a, b) => a + Number(b.price) * b.qty, 0);
  // if (sum > 0) {
  //   totalSumDisplay.innerHTML = `
  //    <p class="card-text" style="font-weight: 400;"><i class="fa-solid fa-bag-shopping mx-2" style="color:orange;"></i>Total Amount =</p>
  //    <p class="card-text" style="font-weight: 400;">Rs ${sum}/-</p>
  //  `;
  // } else {
  //   totalSumDisplay.innerHTML = `
  //    <p class="card-text" style="font-weight: 400;"><i class="fa-solid fa-bag-shopping mx-2" style="color:orange;"></i> Total Amount =</p>
  //    <p class="card-text fw-bold" style="font-weight: 400;">0</p>
  //  `;
  // }
  function updateSum(cart) {
    const sum = cart.reduce((a, b) => a + Number(b.price) * b.qty, 0);
    const totalSumDisplay = document.getElementById("total-amount-display");
    const totatCartSum = document.getElementById("total-amount-menu");
    let totalAmountDiscount = document.getElementById("total-amount-discount");
    totalAmountDiscount = 150;
    let platformFee = document.getElementById("total-amount-platform");
    platformFee = 10;
    const totalSubT = document.getElementById("total-amount-subT");
    totalSumDisplay.innerHTML = `<p class="card-text" style="font-weight: 400;"><i class="fa-solid fa-bag-shopping mx-2" style="color:orange;"></i>Total Amount =</p>
    <p class="card-text" style="font-weight: 400;">Rs ${sum}/-</p>`;
    totatCartSum.innerHTML = `${sum} Rs`;
    totalSubT.innerHTML = `${sum - totalAmountDiscount + platformFee + 100} Rs`;
  }
  updateSum(cart);
  // console.log("the total amount is =>", sum);
  getCartItems();
}

const getCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  const emptyCart = document.getElementById("cart-empty-msg");
  const cart = document.getElementById("cart");
  cart.innerHTML = ``;

  if (!cartItems || cartItems.length === 0) {
    emptyCart.style.display = "block";
  } else {
    emptyCart.style.display = "none";
    for (let i = 0; i < cartItems.length; i++) {
      // console.log(cartItems[i]);
      cart.innerHTML += `
      <div class="cart-item">
      <div class="row g-0" style="margin-bottom:-20px;">
        <div class="col-2" style="margin: 1rem;">
          <img src="${cartItems[i].image}" class="img-fluid rounded-start dish-image" alt="...">
        </div>
        <div class="col">
          <div class="card-body d-flex justify-content-center align-items-center">
            <div class="pe-5" style="text-align:left;">
              <p class="card-title" style="font-size:12px;">${cartItems[i].name}</p>
              <p class="card-text my-1" id="menu-text" style="color: #e44e3f;"><b style="color:black;">Total =</b> ${cartItems[i].price} Rs x ${cartItems[i].qty} = ${cartItems[i].price * cartItems[i].qty}</p>
            </div>
            <div>
              <a class="btn btn-sm btn-danger" onclick="removeItem('${i}')"><i class="fa-solid fa-trash-can"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    }
  }
}

const removeItem = (i) => {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  // const updatedCartItems = cartItems.filter((item) => item.id !== id);
  // localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  // getCartItems();
  // console.log("removed item from the cart");
  cartItems.splice(Number(i),1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  getCartItems();
  const totalSubT = document.getElementById("total-amount-subT");
  const totatCartSum = document.getElementById("total-amount-menu");
  const sum = cartItems.reduce((a, b) => a + Number(b.price) * b.qty, 0);
  totatCartSum.innerHTML = `${sum} Rs`;
  totalSubT.innerHTML = `${sum - 150 + 10 + 99} Rs`;
  getCartItems();
}

getCartItems();
window.updateQty = updateQty;
window.addToCart = addToCart;
window.removeItem = removeItem;
