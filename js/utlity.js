// Hero-section to Teckite buy section function
// function ticketPage(elements) {
//     const element = document.getElementById(elements);
//     element.scrollIntoView({
//         behavior : 'smooth'
//     })
// }
document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const element = document.getElementById('ticket-counter-section');
    element.scrollIntoView({
        behavior: 'smooth'
    })
})


function selectSetColor(events) {
    const event = document.getElementById(events);
    event.classList.add('bg-emerald-300', 'text-white')
}

const seats = document.getElementsByClassName('seat');
let seatArea = [];
const totalSeats = 40;

for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener('click', function (event) {
        const cleckedSeat = event.target;

        if (cleckedSeat.classList.contains('bg-green-400', 'text-white')) {
            cleckedSeat.classList.remove('bg-green-400', 'text-white')
            const seatIndex = seatArea.indexOf(cleckedSeat.id);
            if (seatIndex > -1) {
                seatArea.splice(seatIndex, 1);
                updateSeatInfo();
                validateInputs()

            }
        }
        else {
            if (seatArea.length < 4) {
                cleckedSeat.classList.add('bg-green-400', 'text-white');
                seatArea.push(cleckedSeat.id);
                updateSeatInfo();
                validateInputs();
            }
            else {
                alert("You can't seclect more then 4 Seats")
            }
        }
    })

}

document.getElementById("c_btn").addEventListener('click', function () {
    const inputValue = document.getElementById("c_value").value
    if (inputValue.toUpperCase() === "NEW15" && seatArea.length === 3) {
        document.getElementById('g_total').innerText = Math.round((seatArea.length * 550) - ((seatArea.length * 550) * 15 / 100));
    } else if (inputValue.toUpperCase() === "COUPLE20" && seatArea.length === 4) {
        document.getElementById('g_total').innerText = (seatArea.length * 550) - ((seatArea.length * 550) * 20 / 100);
    }
})

// Get elements
const btnElement = document.getElementById('next_btn');
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const emailInput = document.getElementById('email');

// Function to check input validity and enable/disable button
function validateInputs() {
    const name = nameInput.value.trim(); // Trim to avoid spaces-only values
    const number = numberInput.value.trim();
    const email = emailInput.value.trim();

    // Check if all fields are filled
    if (name && number && email && seatArea.length > 0) {
        btnElement.removeAttribute('disabled');
    } else {
        btnElement.setAttribute('disabled', 'true');
    }
}

// Add event listeners to input fields
nameInput.addEventListener('input', validateInputs);
numberInput.addEventListener('input', validateInputs);
emailInput.addEventListener('input', validateInputs);

// Add click event listener to the button
btnElement.addEventListener('click', function () {

    const hidePge = document.querySelectorAll('.bus-ticket');
    for (page of hidePge) {
        page.classList.add('hidden')
    }
    document.getElementById('success-page').classList.remove('hidden')
});

document.getElementById('continue_btn').addEventListener('click', function () {
    const hidePge = document.querySelectorAll('.bus-ticket');
    for (page of hidePge) {
        page.classList.remove('hidden')
    }

    document.getElementById('success-page').classList.add('hidden')
    nameInput.value = ''
    emailInput.value = ''
    numberInput.value = ''
    seatArea = []
    updateSeatInfo()
    for (const seat of seats) {
        seat.classList.remove('bg-green-400', 'text-white')
    }
})


function updateSeatInfo() {
    document.getElementById('seat_left').innerText =
        `${totalSeats - seatArea.length} Seat(s) left`;
    document.getElementById('total-sit').innerText = seatArea.length;
    if (seatArea.length >= 3) {
        document.getElementById("c_btn").removeAttribute('disabled')
    } else {
        document.getElementById("c_btn").setAttribute('disabled', 'true')
    }
    const seatListContainer = document.getElementById("seat_list");
    seatListContainer.innerHTML = "";
    for (const seat of seatArea) {
        const seatRow = document.createElement("div");
        seatRow.className = "flex flex-row justify-between";
        seatRow.innerHTML = `
            <p class="text-lg font-medium font-inter text-[#03071299]">${seat.toUpperCase()}</p>
            <p class="text-lg font-medium font-inter text-[#03071299]">Economy</p>
            <p class="text-lg font-medium font-inter text-[#03071299]">550</p>
        `;
        seatListContainer.appendChild(seatRow);
    }
    document.getElementById('total_price').innerText = `${seatArea.length * 550}`
}