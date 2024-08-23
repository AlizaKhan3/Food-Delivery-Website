import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs, serverTimestamp } from "./firebase.js"
const placeOrder = document.getElementById("place-order");
let totalAmountModal = document.getElementById("total-amount-modal");

// const orderSummary = document.getElementById("order-summary");

// orderSummary.innerHTML = ` <tr>
// <th>120 x 2 nights</th>
// <td>240.00 USD</td>
// </tr>
// <tr>
// <th>Discount</th>
// <td>0 USD</td>
// </tr>
// <tr>
// <th>Subtotal</th>
// <td>240 USD</td>
// </tr>
// <tr>
// <th>Tax</th>
// <td>10 USD</td>
// </tr>
// <tr>
// <th>Total</th>
// <td id="total-amount">$180</td>
// </tr>
// `

placeOrder.addEventListener('click', async () => {
    const customerName = document.getElementById("customer-name");
    const customerPhone = document.getElementById("customer-phone");
    const customerAddress = document.getElementById("customer-address");
    const cartItemsRemove = document.getElementById("cart");
    const cart = JSON.parse(localStorage.getItem("cart"));   
    console.log(cart);
    console.log(customerName.value, customerAddress.value, customerPhone.value);
    const orderDetails = {
        customerName: customerName.value,
        customerAddress: customerAddress.value,
        customerPhone: customerPhone.value,
        status: "pending",
        cart,
        timestamp: serverTimestamp(),
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
})