document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const ticketPage = document.getElementById('ticket-counter-section');
    ticketPage.scrollIntoView({
        behavior : 'smooth'
    })
})

const seats = document.getElementsByClassName('seat');
let seatArea = [];
const totalSeats = 40;
for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener('click', function (event) {
        const clickSeat = event.target;

        if (clickSeat.classList.contains('bg-green-400', 'text-white')) {
            clickSeat.classList.remove('bg-green-400', 'text-white');
            const seatIndex = seatArea.indexOf(clickSeat.id)

            if (seatIndex > - 1) {
                seatArea.splice(seatIndex, 1 )
                updateSeatInfo()
            }
        }
        else{
            if (seatArea.length <4) {
                clickSeat.classList.add('bg-green-400', 'text-white')
                seatArea.push(clickSeat.id);
                updateSeatInfo()
            }
            else{
                alert('You cannot add more then 4 seats')
            }
        }
    })
}

function updateSeatInfo() {
    document.getElementById('seat_left').innerText=
    `${totalSeats - seatArea.length} Seats left`
}


