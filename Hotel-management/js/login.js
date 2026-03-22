document.getElementById("loginForm").addEventListener("submit",function(e){

e.preventDefault()

let user=document.getElementById("loginUser").value
let pass=document.getElementById("loginPass").value
let role=document.getElementById("role").value

if(role==="admin"){

if(user==="admin" && pass==="Admin@123"){

localStorage.setItem("username","Admin")

window.location.href="admin_dashboard.html"

}else{

document.getElementById("loginError").innerText="Invalid admin credentials"

}

}

else{

localStorage.setItem("username",user)

window.location.href="user_dashboard.html"

}

})