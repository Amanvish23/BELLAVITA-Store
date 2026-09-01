// =========================================
// BELLAVITA CART
// =========================================


// =========================================
// GET CURRENT USER
// =========================================

function getCurrentUser() {

    try {

        return JSON.parse(
            localStorage.getItem("currentUser")
        );

    } catch (error) {

        return null;

    }

}


// =========================================
// LOGIN PROTECTION
// =========================================

const currentUser = getCurrentUser();

if (!currentUser) {

    alert("Please login first to access your cart.");

    window.location.href = "login.html";

}


// =========================================
// CART KEY
// =========================================

const cartKey = currentUser
    ? `cart_${currentUser.email}`
    : null;


// =========================================
// GET CART
// =========================================

let cartItems = [];

if (cartKey) {

    try {

        cartItems =
            JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

    } catch (error) {

        cartItems = [];

    }

}


// =========================================
// ELEMENTS
// =========================================

const cartContainer =
    document.getElementById("cart-container");

const totalPrice =
    document.getElementById("total-price");

const checkoutButton =
    document.getElementById("checkout-btn");


// =========================================
// SAVE CART
// =========================================

function saveCart() {

    if (!cartKey) {
        return;
    }

    localStorage.setItem(
        cartKey,
        JSON.stringify(cartItems)
    );

}


// =========================================
// DISPLAY CART
// =========================================

function displayCart() {

    if (!cartContainer) {
        return;
    }


    // EMPTY CART

    if (cartItems.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    Looks like you haven't added
                    anything yet.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>

            </div>

        `;


        if (totalPrice) {

            totalPrice.innerHTML =
                "Total : ₹0";

        }


        if (checkoutButton) {

            checkoutButton.style.pointerEvents =
                "none";

            checkoutButton.style.opacity =
                "0.5";

        }


        return;

    }


    // ENABLE CHECKOUT

    if (checkoutButton) {

        checkoutButton.style.pointerEvents =
            "auto";

        checkoutButton.style.opacity =
            "1";

    }


    cartContainer.innerHTML = "";

    let total = 0;


    // DISPLAY PRODUCTS

    cartItems.forEach((item, index) => {

        const price =
            Number(item.price) || 0;

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;


        total += itemTotal;


        cartContainer.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div class="cart-item-details">

                    <h3>
                        ${item.name}
                    </h3>


                    <p>
                        Category:
                        ${item.category}
                    </p>


                    <p class="cart-price">

                        ₹${price.toLocaleString("en-IN")}

                    </p>


                    <div class="quantity-box">

                        <button
                            type="button"
                            onclick="decreaseQuantity(${index})"
                        >
                            −
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            onclick="increaseQuantity(${index})"
                        >
                            +
                        </button>

                    </div>


                    <p class="item-total">

                        Item Total:

                        <strong>
                            ₹${itemTotal.toLocaleString("en-IN")}
                        </strong>

                    </p>


                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeItem(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    saveCart();


    // TOTAL

    if (totalPrice) {

        totalPrice.innerHTML =
            `Total : ₹${total.toLocaleString("en-IN")}`;

    }

}


// =========================================
// INCREASE QUANTITY
// =========================================

function increaseQuantity(index) {

    if (!cartItems[index]) {
        return;
    }


    cartItems[index].quantity =
        Number(cartItems[index].quantity || 1) + 1;


    saveCart();

    displayCart();

    updateCartCount();

}


// =========================================
// DECREASE QUANTITY
// =========================================

function decreaseQuantity(index) {

    if (!cartItems[index]) {
        return;
    }


    const quantity =
        Number(cartItems[index].quantity || 1);


    if (quantity > 1) {

        cartItems[index].quantity =
            quantity - 1;

    } else {

        const confirmRemove =
            confirm(
                "Remove this product from your cart?"
            );


        if (!confirmRemove) {
            return;
        }


        cartItems.splice(index, 1);

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// =========================================
// REMOVE ITEM
// =========================================

function removeItem(index) {

    if (!cartItems[index]) {
        return;
    }


    cartItems.splice(index, 1);


    saveCart();

    displayCart();

    updateCartCount();

}


// =========================================
// CART COUNT
// =========================================

function updateCartCount() {

    const count =
        document.getElementById("cart-count");


    if (!count) {
        return;
    }


    let totalQuantity = 0;


    cartItems.forEach(item => {

        totalQuantity +=
            Number(item.quantity || 1);

    });


    count.textContent =
        totalQuantity;

}


// =========================================
// INITIAL LOAD
// =========================================

displayCart();

updateCartCount();