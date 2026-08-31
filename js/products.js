// Bellavita Store Products

const products = [
  {
    id: 1,
    name: "Luxury Oud Perfume",
    price: 799,
    category: "Perfume",
    image: "images/Luxury Oud Perfume.jpg",
    rating: 4.8,
    description: "Long lasting premium oud fragrance."
  },

  {
    id: 2,
    name: "CEO Man Eau De Parfum",
    price: 599,
    category: "Perfume",
    image: "images/Bella Vita CEO Man Perfume.jpg",
    rating: 4.6,
    description: "Fresh woody fragrance for men."
  },

  {
    id: 3,
    name: "CEO Woman Perfume",
    price: 649,
    category: "Perfume",
    image: "images/CEO Woman Perfume.jpg",
    rating: 4.7,
    description: "Elegant floral fragrance."
  },

  {
    id: 4,
    name: "Honey Body Wash",
    price: 299,
    category: "Body Care",
    image: "images/Honey Body Wash.jpg",
    rating: 4.4,
    description: "Gentle moisturizing body wash."
  },

  {
    id: 5,
    name: "Vitamin C Face Wash",
    price: 249,
    category: "Skin Care",
    image: "images/Vitamin C Face Wash.jpg",
    rating: 4.5,
    description: "Brightens and cleanses your skin."
  },

  {
    id: 6,
    name: "Rose Body Lotion",
    price: 349,
    category: "Body Care",
    image: "images/ROSES BODY LOTION.jpg",
    rating: 4.5,
    description: "Soft and hydrated skin."
  },

  {
    id: 7,
    name: "Luxury Gift Box",
    price: 1499,
    category: "Gift Set",
    image: "images/Luxury Gift Box.jpg",
    rating: 4.9,
    description: "Perfect gift for every occasion."
  },

  {
    id: 8,
    name: "Ocean Fresh Perfume",
    price: 699,
    category: "Perfume",
    image: "images/Ocean Fresh Perfume.jpg",
    rating: 4.7,
    description: "Cool aquatic fragrance."
  },

  {
    id: 9,
    name: "Night Desire Perfume",
    price: 749,
    category: "Perfume",
    image: "images/Night Desire Perfume.jpg",
    rating: 4.8,
    description: "Rich evening fragrance."
  },

  {
    id: 10,
    name: "Coffee Face Scrub",
    price: 299,
    category: "Skin Care",
    image: "images/Coffee Face Scrub.jpg",
    rating: 4.5,
    description: "Natural exfoliating scrub."
  },

  {
    id: 11,
    name: "Aloe Vera Gel",
    price: 199,
    category: "Skin Care",
    image: "images/Aloe Vera Gel.jpg",
    rating: 4.6,
    description: "Cooling and soothing gel."
  },

  {
    id: 12,
    name: "Charcoal Face Wash",
    price: 279,
    category: "Skin Care",
    image: "images/Charcoal Face Wash.jpg",
    rating: 4.4,
    description: "Deep pore cleansing."
  },

  {
    id: 13,
    name: "Royal Musk Perfume",
    price: 899,
    category: "Perfume",
    image: "images/Royal Musk Perfume.jpg",
    rating: 4.9,
    description: "Premium musk fragrance."
  },

  {
    id: 14,
    name: "Lavender Shower Gel",
    price: 329,
    category: "Body Care",
    image: "images/Lavender Shower Gel.jpg",
    rating: 4.5,
    description: "Refreshing lavender body wash."
  },

  {
    id: 15,
    name: "Premium Gift Hamper",
    price: 1999,
    category: "Gift Set",
    image: "images/Premium Gift Hamper.jpg",
    rating: 5.0,
    description: "Luxury skincare & fragrance collection."
  }
];


// Display Products


const productGrid = document.getElementById("product-grid");

if (productGrid) {

  products.forEach(product => {

    productGrid.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" alt="${product.name}">

        <div class="product-info">

          <h3>${product.name}</h3>

          <p>${product.category}</p>

          <div class="price">₹${product.price}</div>

          <p>⭐ ${product.rating}</p>

          <button onclick="addToCart(${product.id})">
            Add To Cart
          </button>

        </div>

      </div>

    `;

  });

}


// Cart

const currentUser =
JSON.parse(localStorage.getItem("currentUser"));

let cartKey = "guest_cart";

if(currentUser){

    cartKey = `cart_${currentUser.email}`;

}

let cart =
JSON.parse(localStorage.getItem(cartKey)) || [];

function addToCart(id) {

  const product = products.find(item => item.id === id);

  cart.push(product);

  localStorage.setItem(
cartKey,
JSON.stringify(cart)
);

  updateCartCount();

  alert(product.name + " added to cart.");

}


// Cart Count

function updateCartCount() {

  const count = document.getElementById("cart-count");

  if (count) {

    count.textContent = cart.length;

  }

}

updateCartCount();