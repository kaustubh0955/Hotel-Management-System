let bookings=JSON.parse(localStorage.getItem("bookings"))||[]

let ctx=document.getElementById("bookingChart").getContext("2d")

let rooms={Single:0,Double:0,Suite:0}

bookings.forEach(b=>{
rooms[b.room]++
})

new Chart(ctx,{
type:"bar",
data:{
labels:["Single","Double","Suite"],
datasets:[{
label:"Bookings",
data:[rooms.Single,rooms.Double,rooms.Suite]
}]
}
})