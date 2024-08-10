const restaurantImage = document.getElementById("restaurant-image");
const selectedImage = document.getElementById("selected-image");
const addRestaurant = document.getElementById("add-restaurant");
let file;

restaurantImage.addEventListener("change", () => {
    file = event.target.files[0];
//    console.log(event.target.files[0]);
   selectedImage.style.display = "block";
   selectedImage.setAttribute("src", URL.createObjectURL(event.target.files[0]));
})

addRestaurant.addEventListener("click", () => {
    const name = document.getElementById("restaurant-name");
    const address = document.getElementById("restaurant-address");
    const image = document.getElementById("restaurant-image");

    console.log()
})


