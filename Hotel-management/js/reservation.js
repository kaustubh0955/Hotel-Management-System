let roomAvailability={
Single:5,
Double:3,
Suite:2
}

document.getElementById("reservationForm").addEventListener("submit",function(e){

e.preventDefault()

let room=document.getElementById("room").value
let checkin=document.getElementById("checkin").value
let checkout=document.getElementById("checkout").value

if(roomAvailability[room]===0){

alert("Room not available")
return

}

roomAvailability[room]--

let bookingID="BK"+Math.floor(Math.random()*10000)

let booking={
id:bookingID,
room:room,
checkin:checkin,
checkout:checkout
}

let bookings=JSON.parse(localStorage.getItem("bookings")) || []

bookings.push(booking)

localStorage.setItem("bookings",JSON.stringify(bookings))

alert("Booking successful")

window.location.href="bookings.html"

})