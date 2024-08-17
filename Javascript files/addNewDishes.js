import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs } from "./firebase.js"

const getAllRestaurants = async () => {
    const restSelect = document.getElementById("restaurant-name");
    const q = collection(db, "restaurants");
    const querySnapshot = await getDocs(q);
    let index = 0;
    restSelect.innerHTML += `<option selected>Select Restaurant</option>`
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        index++;
        restSelect.innerHTML += `
        <option value="${doc.id}">${doc.data().name}</option>
        `
    })
}

getAllRestaurants();

const addDish = document.getElementById("add-dish");
addDish.addEventListener('click', () => {
    const restName = document.getElementById("restaurant-name");
    const dishName = document.getElementById("dish-name");
    const dishPrice = document.getElementById("dish-price");
    const dishServing = document.getElementById("dish-serving");
    const dishImage = document.getElementById("dish-image");

    const dishDetail = {
        restaurant: restName.value,
        name: dishName.value,
        price: dishPrice.value,
        serving: dishServing.value,
        image: dishImage.value
    }

    console.log(dishDetail);
})


