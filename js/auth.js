// Register System

const registerForm = document.getElementById("register-form");


if(registerForm){


registerForm.addEventListener("submit",(e)=>{


e.preventDefault();



let user={

name:
document.getElementById("name").value,

email:
document.getElementById("register-email").value,

password:
document.getElementById("register-password").value

};



localStorage.setItem(
"user",
JSON.stringify(user)
);



alert("Registration Successful");


window.location.href="login.html";


});


}





// Login System


const loginForm = document.getElementById("login-form");



if(loginForm){


loginForm.addEventListener("submit",(e)=>{


e.preventDefault();



let savedUser =
JSON.parse(localStorage.getItem("user"));



if(!savedUser){

alert(
"Please register first"
);

return;

}



let email =
document.getElementById("login-email").value;



let password =
document.getElementById("login-password").value;




if(
email===savedUser.email &&
password===savedUser.password
){


localStorage.setItem("login","true");

localStorage.setItem(
"currentUser",
JSON.stringify(savedUser)
);


alert("Login Successful");


window.location.href="index.html";


}

else{


alert(
"Invalid Email or Password"
);


}



});


}