const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

let cartKey = "guest_cart";

if(currentUser){

    cartKey = `cart_${currentUser.email}`;
 
}

let cartItems =
JSON.parse(localStorage.getItem(cartKey)) || [];

const cartContainer = document.getElementById("cart-container");

const totalPrice = document.getElementById("total-price");


function displayCart(){

    if(cartItems.length === 0){

        cartContainer.innerHTML = `
        <h2>Your cart is empty</h2>
        `;

        totalPrice.innerHTML = "Total: ₹0";

        return;

    }


    cartContainer.innerHTML = "";

    let total = 0;


    cartItems.forEach((item,index)=>{


        total += item.price;


        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" width="100">


            <div>

            <h3>${item.name}</h3>

            <p>Category: ${item.category}</p>

            <p>Price: ₹${item.price}</p>


            <button onclick="removeItem(${index})">
            Remove
            </button>


            </div>


        </div>

        `;


    });


    totalPrice.innerHTML = 
    `Total: ₹${total}`;

}



function removeItem(index){

    cartItems.splice(index,1);

    localStorage.setItem(
        cartKey,
        JSON.stringify(cartItems)
    );

    displayCart();

    updateCartCount();

}

function updateCartCount(){

    const count = document.getElementById("cart-count");

    if(count){

        count.textContent = cartItems.length;

    }

}

displayCart();

