import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs } from "./firebase.js"
// import { uploadFile } from "./restaurants.js"

let uploadFile = (file, name) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${name.split(" ").join("-")}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                reject(error)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
}


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


const getAllDishes = async () => {
    const allDishes = document.getElementById("all-dishes");
    const q = collection(db, "dishes");
    const querySnapshot = await getDocs(q);
    let index = 0;
    allDishes.innerHTML += ``
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        index++;
        allDishes.innerHTML += `
         <td>01</td>
            <td><img src="${doc.data().image}" class="dish-image" alt=""></td>
            <td>${doc.data().name}</td>
            <td>${doc.data().price}</td>
            <td>${doc.data().serving}</td>
            <td>${doc.data().restaurant}</td>
        `
    })
}

getAllDishes();



const addDish = document.getElementById("addDish");
addDish.addEventListener('click', async () => {
    const restName = document.getElementById("restaurant-name");
    const dishName = document.getElementById("dish-name");
    const dishPrice = document.getElementById("dish-price");
    const dishServing = document.getElementById("dish-serving");
    const dishImage = document.getElementById("dish-image");
    const image = await uploadFile(dishImage, dishName.value);
    const spinner = document.getElementById("dish-spinner");
    const closebtn = document.getElementById("close-btn");

    spinner.style.display = "block";
    const dishDetail = {
        restaurant: restName.value,
        name: dishName.value,
        price: dishPrice.value,
        serving: dishServing.value,
        image
    }
    const docRef = await addDoc(collection(db, "dishes"), dishDetail);
    restName.value = "";
    dishName.value = "";
    dishPrice.value = "";
    dishServing.value = "";
    dishImage.value = "";
    spinner.style.display = "none";
    closebtn.click();

    console.log(docRef);
})


