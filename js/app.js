const userArea = document.getElementById("user-area");  //HTML me jis element ki id user-area hai usko JavaScript me la raha hai.

function checkLogin(){  //ye function checkLogin() user ke login status ko check karta hai.

    if(!userArea) return;

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    ); //localStorage se currentUser ko get kar raha hai aur JSON.parse() se usko JavaScript object me convert kar raha hai.

    if(currentUser){  //agar currentUser exist karta hai to userArea me profile dropdown show karega.

        userArea.innerHTML = ` 

        <div class="profile-dropdown">

            <button class="profile-btn" onclick="toggleProfile(event)">

                <i class="fa-solid fa-user"></i>

                ${currentUser.name}

                <i class="fa-solid fa-chevron-down"></i>

            </button>

            <div class="dropdown-menu" id="dropdown-menu">

                <a href="profile.html">
                    View Profile
                </a>

                <a href="#" onclick="logout(event)">
                    Logout
                 </a>

            </div>

        </div>

        `;

    }

    else{

        userArea.innerHTML = `
        <a href="login.html">Login</a>
        `;

    }

}

function toggleProfile(event){  //ye function toggleProfile(event) profile dropdown ko show/hide karta hai.

    event.stopPropagation();

    document
    .getElementById("dropdown-menu")
    .classList.toggle("show");

}  //

document.addEventListener("click",()=>{

    let menu=document.getElementById("dropdown-menu");

    if(menu){

        menu.classList.remove("show");

    }

});

function logout(e){

    e.preventDefault();

    localStorage.removeItem("currentUser");

    localStorage.removeItem("login");

    window.location.href = "index.html";

}
checkLogin();

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navLinks.classList.toggle("active");

    });

}