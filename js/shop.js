const shopProducts = document.getElementById("shop-products");

const search = document.getElementById("search");

const category = document.getElementById("category");



function showProducts(list){


shopProducts.innerHTML="";


list.forEach(product=>{


shopProducts.innerHTML += `


<div class="product-card">


<img src="${product.image}">


<div class="product-info">


<h3>${product.name}</h3>


<p>${product.category}</p>


<div class="price">
₹${product.price}
</div>


<button onclick="addToCart(${product.id})">

Add To Cart

</button>


</div>


</div>


`;


});


}



showProducts(products);



function filterProducts(){


let result = products.filter(product=>{


let matchName =
product.name.toLowerCase()
.includes(search.value.toLowerCase());


let matchCategory =
category.value=="all" ||
product.category==category.value;


return matchName && matchCategory;


});


showProducts(result);


}



search.addEventListener(
"input",
filterProducts
);


category.addEventListener(
"change",
filterProducts
);