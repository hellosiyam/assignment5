document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const tecketPage = document.getElementById('ticket-counter-section');
    tecketPage.scrollIntoView({
        behavior: "smooth"
    })
})

// seat sectoin:
const seats = document.getElementsByClassName('seat');
let seatArea = [];
const totalSeats = 40;
for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener('click', function (event) {
        const clickedSeat = event.target;
        const index = seatArea.indexOf(clickedSeat);
        if (clickedSeat.classList.contains('bg-green-400', 'text-white')) {
            clickedSeat.classList.remove('bg-green-400', 'text-white');
            if (seatArea.length > -1) {
                seatArea.splice(index, 1)
            }
            updateSeatInfo();
            nameNumberEmail();
        }
        else {
            if (seatArea.length < 4) {
                clickedSeat.classList.add('bg-green-400', 'text-white');
                seatArea.push(clickedSeat.innerText);
                updateSeatInfo();
                nameNumberEmail();
            }
            else {
                alert('you cannot add more then 4 seats')
            }
        }
    })
}

// Update info:
function updateSeatInfo() {
    const seat_left = document.getElementById('seat_left');
    seat_left.innerText = totalSeats - seatArea.length;

    const total_sit = document.getElementById('total-sit');
    total_sit.innerText = seatArea.length;

    // inner-Html:
    const seat_list = document.getElementById('seat_list');
    seat_list.innerHTML = '';
    for (const seat of seatArea) {
        const creatDiv = document.createElement('div');
        creatDiv.classList = 'flex flex-row justify-between';
        creatDiv.innerHTML = `
                        <p class="text-lg font-medium font-inter text-[#03071299]">${seat}</p>
                        <p class="text-lg font-medium font-inter text-[#03071299]">Economoy</p>
                        <p class="text-lg font-medium font-inter text-[#03071299]">550</p>
                        `;
        seat_list.appendChild(creatDiv);
    }

    // Total Price:
    const total_price = document.getElementById('total_price');
    total_price.innerText = 550 * seatArea.length;

    // Apply ButtonEnable:
    const c_btn = document.getElementById('c_btn')
    if (seatArea.length >= 3) {
        c_btn.removeAttribute('disabled')
    }
}

// copupon- section:
const g_total = document.getElementById('g_total')
document.getElementById('c_btn').addEventListener('click', function () {
    const copupon = document.getElementById('c_value');
    if (copupon.value.toUpperCase() === 'NEW15') {
        const discount15 = (seatArea.length * 550) - ((seatArea.length * 550) * 15 / 100);
        g_total.innerText = parseInt(discount15);
    }
    else if(copupon.value.toUpperCase() === 'COUPLE20'){
        const discount20 = (seatArea.length * 550)- ((seatArea.length * 550) * 20 / 100);
        g_total.innerText = parseInt(discount20);
    }
    else{
        alert('You type wrong Coupuon')
    }

})

// form - section:
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const emailInput = document.getElementById('email');
const next_btn = document.getElementById('next_btn');

function nameNumberEmail() {
    const name = nameInput.value.trim();
    const number = numberInput.value.trim();
    const email = emailInput.value.trim();

    if (name && number && email && seatArea.length > 0) {
        next_btn.removeAttribute('disabled');
    }
}
nameInput.addEventListener('input',nameNumberEmail)
numberInput.addEventListener('input',nameNumberEmail)
emailInput.addEventListener('input',nameNumberEmail)

// Click-Next_btn:
next_btn.addEventListener('click', function () {
    const showPageHide = document.querySelectorAll('.bus-ticket');
    const hidePageShow = document.getElementById('success-page');
    for(pageHide of showPageHide){
        pageHide.classList.add('hidden');
        hidePageShow.classList.remove('hidden'); 
    }
    seatArea = [];
    for(const seat of seats){
        seat.classList.remove('bg-green-400', 'text-white')
    };
    updateSeatInfo();
    nameInput.value = '';
    numberInput.value = ''; 
    emailInput.value = '';
    next_btn.setAttribute('disabled', true);
    
})

// Click-continue_btn:
const continue_btn = document.getElementById('continue_btn');
continue_btn.addEventListener('click', function () {
    const hidePageShow = document.querySelectorAll('.bus-ticket');
    const showPageHide = document.getElementById('success-page');
    for(pageShow of hidePageShow){
        pageShow.classList.remove('hidden');
        showPageHide.classList.add('hidden');
    }
    
})
