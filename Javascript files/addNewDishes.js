import {storage, ref, uploadBytesResumable, getDownloadURL, db, collection, addDoc, getDocs} from "./firebase.js"

const getAllRestaurants = async () => {
    const restSelect = document.getElementById("restaurant-name");
    const q = collection(db, "restaurants");
    const querySnapshot = await getDocs(q);
    let index = 0;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ",  doc.data());
        index ++;
        restSelect.innerHTML += `
        <option selected>Select Restaurant</option>
        `
        restSelect.innerHTML += `
        <option value="${doc.id}">${doc.data().name}</option>
        `
    })

}

let addUserToFirestor = async () => {
    const data = await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
}

