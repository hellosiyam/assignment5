document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const ticketPage = document.getElementById('ticket-counter-section');
    ticketPage.scrollIntoView({
        behavior: 'smooth'
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
                seatArea.splice(seatIndex, 1)
                updateSeatInfo()
                validateInputs()
            }
        }
        else {
            if (seatArea.length < 4) {
                clickSeat.classList.add('bg-green-400', 'text-white')
                seatArea.push(clickSeat.id);
                updateSeatInfo()
                validateInputs()
            }
            else {
                alert('You cannot add more then 4 seats')
            }
        }
    })
}

// Coupon-Code section:
document.getElementById('c_btn').addEventListener('click', function() {
    const inputValue = document.getElementById('c_value').value;
    if (inputValue.toUpperCase() === 'NEW15' && seatArea.length ===3) {
        document.getElementById('g_total').innerText= Math.round((seatArea.length * 550) - ((seatArea.length * 550)* 15 / 100));
    }
    else if(inputValue.toUpperCase() === 'Couple20' && seatArea.length === 4){
        document.getElementById('total').innerText = Math.round((seatArea.length * 550) - ((seatArea.length * 550)*20 / 100))
    }
})

// Form-Section:
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const emailInput = document.getElementById('email');
const btnElement = document.getElementById('next_btn');

// Function to check input validity and enable/disable button
function validateInputs() {
    const name = nameInput.value.trim(); // Trim to avoid spaces-only values
    const number = numberInput.value.trim();
    const email = emailInput.value.trim();

    // Check if all fields are filled
    if (name && number && email && seatArea.length >0) {
        btnElement.removeAttribute('disabled');
    } else {
        btnElement.setAttribute('disabled', true);
    }
}

// Add event listeners to input fields
nameInput.addEventListener('input', validateInputs);
numberInput.addEventListener('input', validateInputs);
emailInput.addEventListener('input', validateInputs);

// Add click event listener to the button
btnElement.addEventListener('click', function() {
    const hidePage = document.querySelectorAll('.bus-ticket');
    for(page of hidePage ){
        page.classList.add('hidden')
    }
    document.getElementById('success-page').classList.remove('hidden')
});

// Continue-page:
document.getElementById('continue_btn').addEventListener('click', function(){
    const hidePage = document.querySelectorAll('.bus-ticket');
    for(page of hidePage){
        page.classList.remove('hidden')
    }
    document.getElementById('success-page').classList.add('hidden')
    nameInput.value = ''
    numberInput.value = ''
    emailInput.value = ''
    seatArea = []
    updateSeatInfo( )
    btnElement.setAttribute('disabled', true);
    for(const seat of seats){
        seat.classList.remove('bg-green-400', 'text-white')
    }
})

// Commmon-Function for Seats:
function updateSeatInfo() {
    document.getElementById('seat_left').innerText =
        `${totalSeats - seatArea.length} Seats left`
    document.getElementById('total-sit').innerText = seatArea.length

    if (seatArea.length >= 3) {
        document.getElementById('c_btn').removeAttribute('disabled');
    }
    else {
        document.getElementById('c_btn').setAttribute('disabled', true)
    }
    const seatListContainer = document.getElementById('seat_list');
    seatListContainer.innerHTML = '';
    for (const seat of seatArea) {
        const seatRow = document.createElement('div');
        seatRow.className = 'flex flex-row justify-between';
        seatRow.innerHTML = `
            <p class="text-lg font-medium font-inter text-[#03071299]">${seat.toUpperCase()}</p>
            <p class="text-lg font-medium font-inter text-[#03071299]">Economy</p>
            <p class="text-lg font-medium font-inter text-[#03071299]">550</p>
        `;
        seatListContainer.appendChild(seatRow);
    }
    document.getElementById('total_price').innerText = seatArea.length * 550;
}


