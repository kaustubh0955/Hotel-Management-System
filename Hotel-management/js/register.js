document.getElementById("registerForm").addEventListener("submit",function(e){

e.preventDefault()

let pass=document.getElementById("password").value
let confirm=document.getElementById("confirmPassword").value

let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/;

if(!regex.test(pass)){
alert("Password must contain upper lower and special character")
return
}

if(pass!==confirm){
alert("Passwords do not match")
return
}

let id="USER"+Math.floor(Math.random()*10000)

localStorage.setItem("generatedID",id)

window.location.href="success.html"

})