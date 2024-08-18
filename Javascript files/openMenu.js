import { collection, db, collection, getDocs, where, query } from "./firebase.js"

const getAllDishes = async () => {
    const allDishes = document.getElementById("all-dishes");
    const q = collection(db, "dishes");
    const querySnapshot = await getDocs(q);     
    allDishes.innerHTML = ``
    querySnapshot.forEach((doc) => {
        allDishes.innerHTML += `
             <div class="card mb-3 p-2 w-100">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://images.deliveryhero.io/image/fd-pk/LH/n1zj-listing.jpg?width=400&height=225"
                                class="img-fluid rounded-start w-100" style="border-radius: 1rem;" alt="...">
                            <div class="card-img-overlay">
                                <button type="button" class="btn btn-primary" id="liveToastBtn">Avail 25% Off</button>
                                <div class="toast-container position-fixed bottom-0 end-0 p-3">
                                    <div id="liveToast" class="toast" role="alert" aria-live="assertive"
                                        aria-atomic="true">
                                        <div class="toast-header">
                                            <!-- <img src="..." class="rounded me-2" alt="..."> -->
                                            <strong class="me-auto">OniFood</strong>
                                            <small>11 mins ago</small>
                                            <button type="button" class="btn-close" data-bs-dismiss="toast"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="toast-body">
                                            Hello, world! This is a toast message.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body"> 
                              <div class="d-flex justify-content-between">
                                  <div>
                                    <p class="card-text">
                                        <span class="badge text-bg-primary px-4 py-2">Burgers</span>
                                        <span class="badge text-bg-primary px-4 py-2">BBQ</span>
                                        <span class="badge text-bg-primary px-4 py-2">Roti</span>
                                        <span class="badge text-bg-primary px-4 py-2">Drinks</span>
                                    </p>
                                    <h5 class="card-title" style="font-weight: bolder;">Yum Foods</h5>
                                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins
                                            ago</small>
                                    </p>
                                </div>
                                <div class="d-flex align-items-baseline">
                                    <div>
                                        <i class="fa-solid fa-phone social-icons"> <span>+92 3214567890</span> </i>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    })
}

getAllDishes();