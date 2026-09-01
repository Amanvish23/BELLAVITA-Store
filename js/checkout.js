// =========================================
// BELLAVITA CHECKOUT
// =========================================


// =========================================
// LOGIN PROTECTION
// =========================================

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


if (!currentUser) {

    alert(
        "Please login first to continue checkout."
    );

    window.location.href =
        "login.html";

    throw new Error(
        "User is not logged in."
    );

}


// =========================================
// USER CART
// =========================================

const cartKey =
    `cart_${currentUser.email}`;


let cartItems =
    JSON.parse(
        localStorage.getItem(cartKey)
    ) || [];


// =========================================
// ELEMENTS
// =========================================

const checkoutItems =
    document.getElementById("checkout-items");

const subtotalElement =
    document.getElementById("subtotal");

const discountElement =
    document.getElementById("discount");

const shippingElement =
    document.getElementById("shipping");

const grandTotalElement =
    document.getElementById("grand-total");

const couponInput =
    document.getElementById("coupon");

const couponButton =
    document.getElementById("apply-coupon");

const couponMessage =
    document.getElementById("coupon-message");

const placeOrderButton =
    document.getElementById("place-order");

const successModal =
    document.getElementById("success-modal");

const orderIdElement =
    document.getElementById("order-id");


// =========================================
// VARIABLES
// =========================================

let subtotal = 0;

let discount = 0;

let shipping = 0;

let couponApplied = false;


// =========================================
// DISPLAY CHECKOUT ITEMS
// =========================================

function displayCheckoutItems() {

    if (cartItems.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products before checkout.
                </p>

                <a href="shop.html">
                    Continue Shopping
                </a>

            </div>

        `;

        subtotalElement.textContent =
            "₹0";

        discountElement.textContent =
            "-₹0";

        shippingElement.textContent =
            "FREE";

        grandTotalElement.textContent =
            "₹0";

        placeOrderButton.disabled = true;

        return;

    }


    checkoutItems.innerHTML = "";

    subtotal = 0;


    cartItems.forEach(item => {

        const price =
            Number(item.price);

        const quantity =
            Number(item.quantity || 1);

        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div class="checkout-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.category} × ${quantity}
                    </p>

                </div>


                <div class="checkout-item-price">

                    ₹${itemTotal.toLocaleString("en-IN")}

                </div>

            </div>

        `;

    });


    calculateTotal();

}


// =========================================
// CALCULATE TOTAL
// =========================================

function calculateTotal() {

    // Free shipping above ₹999
    // Otherwise ₹49

    if (subtotal >= 999) {

        shipping = 0;

        shippingElement.textContent =
            "FREE";

    } else {

        shipping = 49;

        shippingElement.textContent =
            "₹49";

    }


    // Discount cannot exceed subtotal

    if (discount > subtotal) {

        discount = subtotal;

    }


    const finalTotal =
        subtotal -
        discount +
        shipping;


    subtotalElement.textContent =
        `₹${subtotal.toLocaleString("en-IN")}`;


    discountElement.textContent =
        `-₹${discount.toLocaleString("en-IN")}`;


    grandTotalElement.textContent =
        `₹${finalTotal.toLocaleString("en-IN")}`;

}


// =========================================
// COUPON
// =========================================

couponButton.addEventListener(
    "click",
    function () {

        const coupon =
            couponInput.value
                .trim()
                .toUpperCase();


        if (coupon === "") {

            couponMessage.textContent =
                "Please enter a coupon code.";

            return;

        }


        if (coupon === "BELLAVITA10") {

            if (couponApplied) {

                couponMessage.textContent =
                    "Coupon is already applied.";

                return;

            }


            discount =
                Math.round(subtotal * 0.10);


            couponApplied = true;


            couponMessage.textContent =
                "✓ BELLAVITA10 applied — 10% discount";


            calculateTotal();

        }

        else {

            discount = 0;

            couponApplied = false;


            couponMessage.textContent =
                "✕ Invalid coupon code.";


            calculateTotal();

        }

    }
);


// =========================================
// PAYMENT METHOD
// =========================================

const paymentOptions =
    document.querySelectorAll(
        'input[name="payment"]'
    );


const upiBox =
    document.getElementById("upi-box");

const cardBox =
    document.getElementById("card-box");


paymentOptions.forEach(option => {

    option.addEventListener(
        "change",
        function () {

            if (this.value === "upi") {

                upiBox.classList.remove(
                    "hidden"
                );

                cardBox.classList.add(
                    "hidden"
                );

            }


            else if (this.value === "card") {

                upiBox.classList.add(
                    "hidden"
                );

                cardBox.classList.remove(
                    "hidden"
                );

            }


            else if (this.value === "cod") {

                upiBox.classList.add(
                    "hidden"
                );

                cardBox.classList.add(
                    "hidden"
                );

            }

        }
    );

});


// =========================================
// DELIVERY VALIDATION
// =========================================

function validateCheckout() {

    const fullName =
        document
            .getElementById("fullName")
            .value
            .trim();


    const mobile =
        document
            .getElementById("mobile")
            .value
            .trim();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const address =
        document
            .getElementById("address")
            .value
            .trim();


    const city =
        document
            .getElementById("city")
            .value
            .trim();


    const state =
        document
            .getElementById("state")
            .value
            .trim();


    const pincode =
        document
            .getElementById("pincode")
            .value
            .trim();


    if (
        !fullName ||
        !mobile ||
        !email ||
        !address ||
        !city ||
        !state ||
        !pincode
    ) {

        alert(
            "Please fill in all delivery details."
        );

        return false;

    }


    // Mobile

    if (
        !/^[6-9]\d{9}$/.test(mobile)
    ) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return false;

    }


    // Pincode

    if (
        !/^\d{6}$/.test(pincode)
    ) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return false;

    }


    // Email

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {

        alert(
            "Please enter a valid email address."
        );

        return false;

    }


    return true;

}


// =========================================
// PAYMENT VALIDATION
// =========================================

function validatePayment() {

    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!selectedPayment) {

        alert(
            "Please select a payment method."
        );

        return false;

    }


    // =====================================
    // UPI
    // =====================================

    if (selectedPayment.value === "upi") {

        const upi =
            document
                .getElementById("upi")
                .value
                .trim();


        if (
            !/^[\w.-]+@[\w.-]+$/.test(upi)
        ) {

            alert(
                "Please enter a valid UPI ID."
            );

            return false;

        }

    }


    // =====================================
    // CARD
    // =====================================

    if (selectedPayment.value === "card") {

        const cardName =
            document
                .getElementById("card-name")
                .value
                .trim();


        const cardNumber =
            document
                .getElementById("card-number")
                .value
                .replace(/\s/g, "");


        const expiry =
            document
                .getElementById("expiry")
                .value
                .trim();


        const cvv =
            document
                .getElementById("cvv")
                .value
                .trim();


        if (!cardName) {

            alert(
                "Please enter card holder name."
            );

            return false;

        }


        if (
            !/^\d{16}$/.test(cardNumber)
        ) {

            alert(
                "Please enter a valid 16-digit card number."
            );

            return false;

        }


        if (
            !/^\d{2}\/\d{2}$/.test(expiry)
        ) {

            alert(
                "Please enter expiry in MM/YY format."
            );

            return false;

        }


        if (
            !/^\d{3}$/.test(cvv)
        ) {

            alert(
                "Please enter a valid 3-digit CVV."
            );

            return false;

        }

    }


    return true;

}


// =========================================
// CARD NUMBER FORMAT
// =========================================

const cardNumberInput =
    document.getElementById(
        "card-number"
    );


cardNumberInput.addEventListener(
    "input",
    function () {

        let value =
            this.value.replace(
                /\D/g,
                ""
            );


        value =
            value.substring(
                0,
                16
            );


        const formatted =
            value.match(
                /.{1,4}/g
            );


        this.value =
            formatted
                ? formatted.join(" ")
                : "";

    }
);


// =========================================
// EXPIRY FORMAT
// =========================================

const expiryInput =
    document.getElementById(
        "expiry"
    );


expiryInput.addEventListener(
    "input",
    function () {

        let value =
            this.value.replace(
                /\D/g,
                ""
            );


        value =
            value.substring(
                0,
                4
            );


        if (value.length >= 3) {

            value =
                value.substring(0, 2)
                + "/"
                + value.substring(2);

        }


        this.value = value;

    }
);


// =========================================
// MOBILE ONLY NUMBERS
// =========================================

document
    .getElementById("mobile")
    .addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /\D/g,
                    ""
                );

        }
    );


// =========================================
// PINCODE ONLY NUMBERS
// =========================================

document
    .getElementById("pincode")
    .addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /\D/g,
                    ""
                );

        }
    );


// =========================================
// GENERATE ORDER ID
// =========================================

function generateOrderID() {

    const randomNumber =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return (
        `BV${Date.now()
            .toString()
            .slice(-6)}${randomNumber}`
    );

}


// =========================================
// PLACE ORDER
// =========================================

placeOrderButton.addEventListener(
    "click",
    function () {


        // =================================
        // FINAL LOGIN CHECK
        // =================================

        const loggedInUser =
            JSON.parse(
                localStorage.getItem(
                    "currentUser"
                )
            );


        if (!loggedInUser) {

            alert(
                "Your session has expired. Please login again."
            );

            window.location.href =
                "login.html";

            return;

        }


        // =================================
        // FINAL CART CHECK
        // =================================

        const latestCart =
            JSON.parse(
                localStorage.getItem(
                    `cart_${loggedInUser.email}`
                )
            ) || [];


        if (latestCart.length === 0) {

            alert(
                "Your cart is empty."
            );

            window.location.href =
                "cart.html";

            return;

        }


        // =================================
        // DELIVERY VALIDATION
        // =================================

        if (!validateCheckout()) {

            return;

        }


        // =================================
        // PAYMENT VALIDATION
        // =================================

        if (!validatePayment()) {

            return;

        }


        // =================================
        // DISABLE BUTTON
        // =================================

        placeOrderButton.disabled = true;


        placeOrderButton.textContent =
            "PROCESSING ORDER...";


        // =================================
        // DEMO PROCESSING
        // =================================

        setTimeout(
            function () {


                const orderID =
                    generateOrderID();


                orderIdElement.textContent =
                    orderID;


                // =================================
                // CREATE ORDER
                // =================================

                const order = {

                    orderId:
                        orderID,


                    customer: {

                        name:
                            document
                                .getElementById("fullName")
                                .value
                                .trim(),

                        mobile:
                            document
                                .getElementById("mobile")
                                .value
                                .trim(),

                        email:
                            document
                                .getElementById("email")
                                .value
                                .trim(),

                        address:
                            document
                                .getElementById("address")
                                .value
                                .trim(),

                        city:
                            document
                                .getElementById("city")
                                .value
                                .trim(),

                        state:
                            document
                                .getElementById("state")
                                .value
                                .trim(),

                        pincode:
                            document
                                .getElementById("pincode")
                                .value
                                .trim()

                    },


                    items:
                        cartItems,


                    subtotal:
                        subtotal,


                    discount:
                        discount,


                    shipping:
                        shipping,


                    total:
                        subtotal -
                        discount +
                        shipping,


                    payment:
                        document.querySelector(
                            'input[name="payment"]:checked'
                        ).value,


                    date:
                        new Date()
                            .toLocaleString(
                                "en-IN"
                            )

                };


                // =================================
                // SAVE LAST ORDER
                // =================================

                localStorage.setItem(
                    `bellavita_last_order_${loggedInUser.email}`,
                    JSON.stringify(order)
                );


                // =================================
                // SAVE ORDER HISTORY
                // =================================

                const orderHistoryKey =
                    `bellavita_orders_${loggedInUser.email}`;


                const oldOrders =
                    JSON.parse(
                        localStorage.getItem(
                            orderHistoryKey
                        )
                    ) || [];


                oldOrders.push(order);


                localStorage.setItem(
                    orderHistoryKey,
                    JSON.stringify(
                        oldOrders
                    )
                );


                // =================================
                // CLEAR USER CART
                // =================================

                localStorage.removeItem(
                    `cart_${loggedInUser.email}`
                );


                // =================================
                // SHOW SUCCESS
                // =================================

                successModal.classList.remove(
                    "hidden"
                );


            },
            1500
        );

    }
);


// =========================================
// INITIAL LOAD
// =========================================

displayCheckoutItems();