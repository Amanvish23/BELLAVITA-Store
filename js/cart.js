// =========================================
// BELLAVITA CART
// =========================================

// Check logged-in user
const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// =========================================
// LOGIN PROTECTION
// =========================================

if (!currentUser) {

    alert("Please login first to access your cart.");

    window.location.href = "login.html";

}


// =========================================
// USER CART
// =========================================

const cartKey =
    `cart_${currentUser.email}`;


let cartItems =
    JSON.parse(localStorage.getItem(cartKey)) || [];


// =========================================
// ELEMENTS
// =========================================

const cartContainer =
    document.getElementById("cart-container");

const totalPrice =
    document.getElementById("total-price");


// =========================================
// SAVE CART
// =========================================

function saveCart() {

    localStorage.setItem(
        cartKey,
        JSON.stringify(cartItems)
    );

}


// =========================================
// DISPLAY CART
// =========================================

function displayCart() {

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

        totalPrice.innerHTML =
            "Total: ₹0";

        updateCartCount();

        return;
    }


    cartContainer.innerHTML = "";

    let total = 0;


    cartItems.forEach((item, index) => {

        // Support old cart items
        if (!item.quantity) {
            item.quantity = 1;
        }


        const price =
            Number(item.price);

        const quantity =
            Number(item.quantity);

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
                        Category: ${item.category}
                    </p>

                    <p class="cart-price">
                        ₹${price.toLocaleString("en-IN")}
                    </p>


                    <div class="quantity-box">

                        <button
                            onclick="decreaseQuantity(${index})"
                            type="button"
                        >
                            −
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})"
                            type="button"
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
                        class="remove-btn"
                        onclick="removeItem(${index})"
                        type="button"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    saveCart();


    totalPrice.innerHTML =
        `Total: ₹${total.toLocaleString("en-IN")}`;


    updateCartCount();

}


// =========================================
// INCREASE QUANTITY
// =========================================

function increaseQuantity(index) {

    cartItems[index].quantity =
        Number(cartItems[index].quantity || 1) + 1;


    saveCart();

    displayCart();

}


// =========================================
// DECREASE QUANTITY
// =========================================

function decreaseQuantity(index) {

    const currentQuantity =
        Number(cartItems[index].quantity || 1);


    if (currentQuantity > 1) {

        cartItems[index].quantity =
            currentQuantity - 1;

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

}


// =========================================
// REMOVE ITEM
// =========================================

function removeItem(index) {

    cartItems.splice(index, 1);

    saveCart();

    displayCart();

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