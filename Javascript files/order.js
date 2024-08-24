import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs, serverTimestamp, doc } from "./firebase.js"
const placeOrder = document.getElementById("place-order");

placeOrder && placeOrder.addEventListener('click', async () => {
    const customerName = document.getElementById("customer-name");
    const customerPhone = document.getElementById("customer-phone");
    const customerAddress = document.getElementById("customer-address");
    const cartItemsRemove = document.getElementById("cart");
    const modalBtn = document.getElementById("modalBtn")
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    console.log(customerName.value, customerAddress.value, customerPhone.value);
    const orderDetails = {
        customerName: customerName.value,
        customerAddress: customerAddress.value,
        customerPhone: customerPhone.value,
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
    const q = collection(db, "orders");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        console.log("orders", doc.data());
        allOrders.innerHTML = `
        <th scope="row">${index}</th>
            <td><img src="${doc.data().image}" class="dish-image" alt=""></td>
            <td>${doc.data().name}</td>
            <td>${doc.data().description}</td>
            <td>${doc.data().price}</td>
            <td>${doc.data().serving}</td>
            <td>${restaurantNames[doc.data().restaurant]}</td>`
    });
    pageSpinner.style.display = "none";
}

getAllOrders();
