import { storage, ref, getDoc, doc, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs, serverTimestamp, updateDoc } from "./firebase.js"
const placeOrder = document.getElementById("place-order");

placeOrder && placeOrder.addEventListener('click', async () => {
  const customerName = document.getElementById("customer-name");
  const customerPhone = document.getElementById("customer-phone");
  const customerAddress = document.getElementById("customer-address");
  const cartItemsRemove = document.getElementById("cart");
  const modalBtn = document.getElementById("modalBtn")
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalSubT = document.getElementById("total-amount-subT");
  const totatCartSum = document.getElementById("total-amount-menu");
  const sum = cart.reduce((a, b) => a + Number(b.price) * b.qty, 0);
  totatCartSum.innerHTML = `${sum} Rs`;
  totalSubT.innerHTML = `${sum - 150 + 10 + 99} Rs`;

  console.log(cart);
  console.log(customerName.value, customerAddress.value, customerPhone.value);
  const orderDetails = {
    customerName: customerName.value,
    customerPhone: customerPhone.value,
    customerAddress: customerAddress.value,
    totalSum: sum,
    status: "pending",
    cart,
    timestamp: serverTimestamp()
    // orderAmount: 23,
    // deliveryFee: 100,
    // totalAmount: 100,
  }
  const docRef = await addDoc(collection(db, "orders"), orderDetails)

  swal.fire({
    position: "center",
    icon: "success",
    title: "Your Order has been placed",
    showConfirmButton: "false",
    timer: "1500"
  });
  customerName.value = "";
  customerAddress.value = "";
  customerPhone.value = "";
  localStorage.removeItem("cart");
  cartItemsRemove.innerHTML = "";
  modalBtn.click();
})

const getAllOrders = async () => {
  const allOrders = document.getElementById("all-orders")
  const pageSpinner = document.getElementById("page-spinner");
  const mainContent = document.getElementById("main-content-order")
  const q = collection(db, "orders");
  const querySnapshot = await getDocs(q);
  allOrders.innerHTML = ""; // Clear the existing content
  let index = 0;
  querySnapshot.forEach(doc => {
    index++;
    console.log("orders", doc.data());

    let status = doc.data().status;
    let statusColor = "";

    if (status === "pending") {
      statusColor = "text-bg-info";
    }
    if (status === "delivered") {
      statusColor = "text-bg-success";
    }
    if (status === "cancelled") {
      statusColor = "text-bg-warning";
    }
    allOrders.innerHTML += `
            <td>${index}</td>
            <td>${doc.data().customerName}</td>
            <td>${doc.data().customerPhone}</td>
            <td>${doc.data().customerAddress}</td>
            <td>${doc.data().totalSum}</td>
            <td><span class="badge ${statusColor}">${status}</span></td>
 <td><button onclick="viewOrderDetail('${doc.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">View details</button></td>            `
  });
  pageSpinner.style.display = "none";
  mainContent.style.display = "block";
}

getAllOrders();

let updateOrderId;

const viewOrderDetail = async (id) => {
  updateOrderId = id;
  const orderStatus = document.getElementById("orderStatus");
  const cartElement = document.getElementById("cart");
  const docRef = doc(db, "orders", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  orderStatus.value = docSnap.data().status
  const cart = data.cart; // Access the cart property as an array
  cartElement.innerHTML = ""; // Clear the cart element
  cart.forEach((item) => {
    cartElement.innerHTML += `
        <div class="cart-item">
          <div class="row g-0" style="margin-bottom:-20px;">
            <div class="col-2" style="margin: 1rem;">
              <img src="${item.image}" class="img-fluid rounded-start dish-image" alt="...">
            </div>
            <div class="col">
              <div class="card-body d-flex justify-content-center align-items-center">
                <div class="pe-5" style="text-align:left;">
                  <p class="card-title" style="font-size:12px;">${item.name}</p>
                  <p class="card-text my-1" id="menu-text" style="color: #ce1a1a;"><b style="color:black;">Total =</b> ${item.price} Rs x ${item.qty} = ${item.price * item.qty}</p>
                </div>
              <div>
                <a class="btn btn-sm btn-danger"><i class="fa-solid fa-check"></i></a>
              </div>
            </div>
          </div>
        </div>
      `;
  });
  const updateOrder = document.getElementById("updateOrder");

  updateOrder.addEventListener("click", async () => {
    console.log(updateOrderId);
    const closeBtn = document.getElementById("close-btn");
    const orderStatus = document.getElementById("orderStatus");
    const docRef = doc(db, "orders", updateOrderId);
    await updateDoc(docRef, {
      status: orderStatus.value,
    });
    closeBtn.click();
    getAllOrders();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getAllOrders();
});

window.viewOrderDetail = viewOrderDetail;
