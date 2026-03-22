if(!localStorage.getItem("username")){
window.location.href="login.html"
}

let name=localStorage.getItem("username")

let el=document.getElementById("username")

if(el){
el.innerText=name
}

function logout(){

localStorage.removeItem("username")

window.location.href="login.html"

}

let bookings=JSON.parse(localStorage.getItem("bookings")) || []

let count=document.getElementById("bookingCount")

if(count){
count.innerText=bookings.length
}