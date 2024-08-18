import { db, collection, getDocs, where, query } from "./firebase.js"

const getAllDishes = async () => {
    const allDishes = document.getElementById("all-dishes");
    const q = collection(db, "dishes");
    const querySnapshot = await getDocs(q);
    allDishes.innerHTML = ``
    querySnapshot.forEach((doc) => {
        allDishes.innerHTML += `
         <div class="card dish-card mb-3 w-100">
                        <div class="row g-0">
                            <div class="col-2">
                                <img src="images/Crispy chicken burger.webp" class="img-fluid rounded-start dish-image"
                                    alt="...">
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <h5 class="card-title" id="menu-title" style="font-weight: bolder;">${doc.data().name}</h5>                          
                                    <p class="card-text my-2" id="menu-text" style="color: #787878;">${doc.data().description}</p>
                                    <p class="card-text my-1" id="menu-text" style="color: #e44e3f;">${doc.data().serving}</p>
                                    <p class="card-text my-1" id="menu-text" style="color: #e44e3f;">${doc.data().price}</p>
                                    </p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end align-items-center mx-2 gap-2">
                                <button class="qty-btn"><i class="fa-solid fa-minus"></i></button>
                                <span class="fw-bold"> 1 </span>
                                <button class="qty-btn"><i class="fa-solid fa-plus"></i></button>
                                <button class="btn btn-primary cart-btn" type="submit">Add to Cart</button>
                            </div>
                        </div>
                    </div>
             
        `
    })
}

getAllDishes();