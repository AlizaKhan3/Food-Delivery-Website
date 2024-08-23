const placeOrder = document.getElementById("place-order");
placeOrder.addEventListener('click', () => {
    const customerName = document.getElementById("customer-name");
    const customerPhone = document.getElementById("customer-phone");
    const customerAddress = document.getElementById("customer-address");
console.log(customerName.value, customerAddress.value, customerPhone.value)
})