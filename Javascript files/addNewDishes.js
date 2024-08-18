import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs } from "./firebase.js"

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

//to get restaurants in dishes function
// let allRestaurants = [];  //User Promise OR global variable OR use call back method

const getAllRestaurants = async () => {
    try {
        const q = collection(db, "restaurants");
        const querySnapshot = await getDocs(q);
        const restSelect = document.getElementById("restaurant-name");
        let index = 0;
        let restaurants = [];
        restSelect.innerHTML += `<option selected>Select Restaurant</option>`
        querySnapshot.forEach((doc) => {
            restaurants.push({ ...doc.data(), id: doc.id });
            // console.log(doc.id, " => ", doc.data());
            index++;
            restSelect.innerHTML += `
            <option value="${doc.id}">${doc.data().name}</option>
            `
        });
        return new Promise((resolve, reject) => {
            resolve(restaurants);
        });
        // allRestaurants = restaurants;
        // console.log(restaurants);
    } catch (error) {
        console.log("error", error);
    }
}
getAllRestaurants();

const getAllDishes = async () => {
    const restaurants = await getAllRestaurants();
    const allDishes = document.getElementById("all-dishes");
    const q = collection(db, "dishes");
    const querySnapshot = await getDocs(q);
    let index = 0;
    let restaurantNames = [];
    for (let i = 0; i < restaurants.length; i++) {
        restaurantNames [restaurants[i].id] = restaurants[i].name;
    }
    console.log(restaurantNames);
    // console.log("all Restaurants name through uid", restaurants);
    allDishes.innerHTML = ``
    querySnapshot.forEach((doc) => {
        index++;
        // const restaurantName = restaurants.filter(v => v.id === doc.data().restaurant);
        // console.log("restaurant name", restaurantNames[0].name);
        allDishes.innerHTML += `
            <th scope="row">${index}</th>
            <td><img src="${doc.data().image}" class="dish-image" alt=""></td>
            <td>${doc.data().name}</td>
            <td>${doc.data().price}</td>
            <td>${doc.data().serving}</td>
            <td>${restaurantNames[doc.data().restaurant]}</td>
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
    const spinner = document.getElementById("dish-spinner");
    const closebtn = document.getElementById("close-btn");
    spinner.style.display = "block";

    const image = await uploadFile(dishImage.files[0], dishName.value);

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
    getAllDishes();
    console.log(docRef); 2
});
