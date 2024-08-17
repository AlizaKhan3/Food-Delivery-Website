// import { getStorage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs} from "./firebase.js"
// const restaurantImage = document.getElementById("restaurant-image");
// const selectedImage = document.getElementById("selected-image");
// const closeBtn = document.getElementById("close-btn");
// let file;

// const storage = getStorage();

// restaurantImage.addEventListener("change", () => {
//     file = event.target.files[0];
//     //    console.log(event.target.files[0]);
//     selectedImage.style.display = "block";
//     selectedImage.setAttribute("src", URL.createObjectURL(event.target.files[0]));
// })

// let uploadFile = (file, name) => {
//     return new Promise((resolve, reject) => {
//         const storageRef = ref(storage, `images/${name.split(" ").join("-")}`);
//         const uploadTask = uploadBytesResumable(storageRef, file);
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log("Upload is " + progress + " % done");
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 reject(error)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     console.log('File available at', downloadURL);
//                     resolve(downloadURL);
//                 })
//             }
//         )
//     })
// }

// const addRestaurant = document.getElementById("add-restaurant");

// addRestaurant.addEventListener("click", async () => {
//     const name = document.getElementById("restaurant-name");
//     const address = document.getElementById("restaurant-address");
//     const image = await uploadFile(file, name.value);
//     console.log("image", image);
//     name.value = " ";
//     address.value = " ";
//     restaurantImage.value = "";
//     selectedImage.style.display = "none";
//     closeBtn.click();
//     Swal.fire("Restaurant added successfully!");
// })




import { storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs } from '../Javascript files/firebase.js';

const logo = document.getElementById("restaurant-logo");
const selectedLogo = document.getElementById("selected-logo");
let file;

logo && logo.addEventListener("change", (e) => {
    file = e.target.files[0];
    selectedLogo.style.display = "flex";
    selectedLogo.src = URL.createObjectURL(e.target.files[0])
})


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
    const resList = document.getElementById("res-list");
    resList.innerHTML = "";
    const q = collection(db, "restaurants");
    const querySnapshot = await getDocs(q);
    let index = 0;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        index++
        resList.innerHTML += `
                    <tr>
                        <th scope="row">${index}</th>
                        <td><img class="res-logo-image" src="${doc.data().image}" alt=""></td>
                        <td>${doc.data().name}</td>
                        <td>${doc.data().address}</td>
                    </tr>
        `
    });
}

getAllRestaurants()

const submitRestaurant = document.getElementById("submit-restaurant");

submitRestaurant && submitRestaurant.addEventListener('click', async () => {
    const closeBtn = document.getElementById("close-btn")
    const spinner = document.getElementById("restaurant-spinner");
    const name = document.getElementById("restaurant-name");
    const address = document.getElementById("restaurant-address");
    spinner.style.display = "block"
    const image = await uploadFile(file, name.value)
    const docRef = await addDoc(collection(db, "restaurants"), {
        name: name.value,
        address: address.value,
        image
    });
    spinner.style.display = "none"
    name.value = "";
    address.value = "";
    logo.value = "";
    selectedLogo.style.display = "none";
    console.log("Document written with ID: ", docRef.id);
    getAllRestaurants();
    closeBtn.click()
    Swal.fire("Restaurant added successfully!");
})

export { uploadFile };