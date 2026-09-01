// =========================================
// BELLAVITA STORE - APP
// =========================================


// =========================================
// USER / LOGIN AREA
// =========================================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}


// =========================================
// NAVBAR USER AREA
// =========================================

function updateUserArea() {

    const userArea =
        document.getElementById("user-area");

    if (!userArea) {
        return;
    }


    const currentUser =
        getCurrentUser();


    // Not logged in

    if (!currentUser) {

        userArea.innerHTML = `

            <a href="login.html">
                Login
            </a>

        `;

        return;
    }


    // Logged in

    userArea.innerHTML = `

        <div class="profile-dropdown">

            <button
                class="profile-btn"
                id="profileBtn"
                type="button"
            >

                <i class="fa-solid fa-user"></i>

                ${currentUser.name}

                <i class="fa-solid fa-chevron-down"></i>

            </button>


            <div
                class="dropdown-menu"
                id="profileMenu"
            >

                <a href="profile.html">
                    View Profile
                </a>

                <a
                    href="#"
                    onclick="logout(event)"
                >
                    Logout
                </a>

            </div>

        </div>

    `;


    const profileBtn =
        document.getElementById("profileBtn");

    const profileMenu =
        document.getElementById("profileMenu");


    if (profileBtn && profileMenu) {

        profileBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                profileMenu.classList.toggle("show");

            }
        );

    }

}


// =========================================
// LOGOUT
// =========================================

function logout(event) {

    if (event) {
        event.preventDefault();
    }


    localStorage.removeItem("currentUser");

    localStorage.removeItem("login");


    window.location.href =
        "index.html";

}


// =========================================
// CLOSE PROFILE DROPDOWN
// =========================================

document.addEventListener(
    "click",
    function () {

        const profileMenu =
            document.getElementById("profileMenu");

        if (profileMenu) {

            profileMenu.classList.remove("show");

        }

    }
);


// =========================================
// FEATURED PRODUCTS
// =========================================

function showFeaturedProducts() {

    const productGrid =
        document.getElementById("product-grid");


    // Stop if product grid doesn't exist

    if (!productGrid) {
        return;
    }


    // Clear existing products

    productGrid.innerHTML = "";


    // Show ALL products

    products.forEach(function (product) {

        productGrid.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>


                    <p>
                        ${product.category}
                    </p>


                    <div class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </div>


                    <p>
                        ⭐ ${product.rating}
                    </p>


                    <button
                        type="button"
                        onclick="addToCart(${product.id})"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        `;

    });

}


// =========================================
// CART COUNT
// =========================================

function updateHomeCartCount() {

    const count =
        document.getElementById("cart-count");


    if (!count) {
        return;
    }


    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        count.textContent = "0";

        return;
    }


    const cartKey =
        `cart_${currentUser.email}`;


    const cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];


    let totalQuantity = 0;


    cart.forEach(function (item) {

        totalQuantity +=
            Number(item.quantity || 1);

    });


    count.textContent =
        totalQuantity;

}


// =========================================
// MOBILE MENU
// =========================================

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("active");

        }
    );

}


// =========================================
// INITIAL LOAD
// =========================================

updateUserArea();

showFeaturedProducts();

updateHomeCartCount();