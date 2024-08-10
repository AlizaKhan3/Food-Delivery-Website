const restaurantImage = document.getElementById("restaurant-image");
const selectedImage = document.getElementById("selected-image");

restaurantImage.addEventListener("change", () => {
   console.log(event.target.files[0]);
   selectedImage.style.display = "block";
   selectedImage.setAttribute("src", URL.createObjectURL(event.target.files[0]));
})


