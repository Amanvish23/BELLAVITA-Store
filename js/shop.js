
// BELLAVITA SHOP

const shopProductGrid =
    document.getElementById("product-grid");

const searchInput =
    document.getElementById("search");

const categorySelect =
    document.getElementById("category");

const noProducts =
    document.getElementById("no-products");


// =========================================
// CHECK SHOP PAGE
// =========================================

if (
    shopProductGrid &&
    searchInput &&
    categorySelect
) {

    // =====================================
    // DISPLAY SHOP PRODUCTS
    // =====================================

    function displayShopProducts(list) {

        shopProductGrid.innerHTML = "";


        // No products

        if (list.length === 0) {

            if (noProducts) {
                noProducts.style.display = "block";
            }

            return;

        }


        if (noProducts) {
            noProducts.style.display = "none";
        }


        // Products

        list.forEach(product => {

            shopProductGrid.innerHTML += `

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


    // =====================================
    // FILTER
    // =====================================

    function filterProducts() {

        const searchText =
            searchInput.value
            .trim()
            .toLowerCase();


        const selectedCategory =
            categorySelect.value;


        const filteredProducts =
            products.filter(product => {

                const matchesSearch =
                    product.name
                    .toLowerCase()
                    .includes(searchText);


                const matchesCategory =
                    selectedCategory === "all" ||
                    product.category === selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            });


        displayShopProducts(
            filteredProducts
        );

    }


    // =====================================
    // SEARCH
    // =====================================

    searchInput.addEventListener(
        "input",
        filterProducts
    );


    // =====================================
    // CATEGORY
    // =====================================

    categorySelect.addEventListener(
        "change",
        filterProducts
    );


    // =====================================
    // INITIAL
    // =====================================

    displayShopProducts(products);

}