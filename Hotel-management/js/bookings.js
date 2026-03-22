let bookings=JSON.parse(localStorage.getItem("bookings")) || []

let table=document.getElementById("bookingTable")

function loadBookings(){

table.innerHTML=""

bookings.forEach((b,index)=>{

let row=`
<tr>
<td>${b.id}</td>
<td>${b.room}</td>
<td>${b.checkin}</td>
<td>${b.checkout}</td>
<td>
<button onclick="cancelBooking(${index})">Cancel</button>
</td>
</tr>
`

table.innerHTML+=row

})

}

function cancelBooking(index){

bookings.splice(index,1)

localStorage.setItem("bookings",JSON.stringify(bookings))

loadBookings()

}

loadBookings()

document.getElementById("searchBooking").addEventListener("keyup",function(){

let value=this.value.toLowerCase()

let rows=document.querySelectorAll("#bookingTable tr")

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)
?"":"none"

})

})