import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs, serverTimestamp, doc } from "./firebase.js"
const placeOrder = document.getElementById("place-order");

placeOrder && placeOrder.addEventListener('click', async () => {
    const customerName = document.getElementById("customer-name");
    const customerPhone = document.getElementById("customer-phone");
    const customerAddress = document.getElementById("customer-address");
    // const totalSum = document.getElementById("total-amount-subT")
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
        totalSum : sum,
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
    let index =  0;
    querySnapshot.forEach(doc => {
        index++;
        console.log("orders", doc.data());

        let status = doc.data().status;
        let statusColor = "";

        if (status === "pending") {
            statusColor = "text-bg-warning";
        }
        if (status === "delivered") {
            statusColor = "text-bg-success";
        }
        if (status === "confirmed") {
            statusColor = "text-bg-info";
        }
        allOrders.innerHTML += `
            <td>${index}</td>
            <td>${doc.data().customerName}</td>
            <td>${doc.data().customerPhone}</td>
            <td>${doc.data().customerAddress}</td>
            <td>${doc.data().totalSum}</td>
            <td><span class="badge ${statusColor}">${status}</span></td>
            `
    });
    pageSpinner.style.display = "none";
    mainContent.style.display = "block";
}

getAllOrders();
