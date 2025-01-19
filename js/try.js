document.getElementById('buy-ticket-btn').addEventListener('click', function () {
    const ticketPage = document.getElementById('ticket-counter-section');
    ticketPage.scrollIntoView({
        behavior: 'smooth'
    })
})

// Select- seats:
const seats = document.getElementsByClassName('seat');
let seatArea = [];//n=[1,2,5,8] 
let totalSeats = 40;
for (let i = 0; i < seats.length; i++) {
    seats[i].addEventListener('click', function (event) {
        const clickSeat = event.target;
        const index = seatArea.indexOf(clickSeat.innerText)

        if (clickSeat.classList.contains('bg-green-400', 'text-white')) {
            clickSeat.classList.remove('bg-green-400', 'text-white')
            if (index > -1) {
                seatArea.splice(index, 1);
                updateSeatInfo();
                fromSection();
            }

        }
        else {

            if (seatArea.length < 4) {
                clickSeat.classList.add('bg-green-400', 'text-white');
                seatArea.push(clickSeat.innerText);
                updateSeatInfo();
                fromSection();
            }
            else {
                alert('You cannot select more then 4 seats')
            }
        }
    })
}



// seat left section
function updateSeatInfo() {
    const seat_left = document.getElementById('seat_left');
    seat_left.innerText = totalSeats - seatArea.length;

    const total_seats = document.getElementById('total-sit');
    total_seats.innerText = seatArea.length;

    //Seat-selection section
    const seat_list = document.getElementById('seat_list');
    seat_list.innerHTML = '';
    for(const seat of seatArea){
        const creatDiv = document.createElement('div');
        creatDiv.classList = ('flex flex-row justify-between');
        creatDiv.innerHTML =`
                        <p class="text-lg font-medium font-inter text-[#03071299]">${(seat.toUpperCase())}</p>
                        <p class="text-lg font-medium font-inter text-[#03071299]">Economoy</p>
                        <p class="text-lg font-medium font-inter text-[#03071299]">550</p>
        `;
        seat_list.appendChild(creatDiv);
    }
    // Total price:
    const total_price = document.getElementById('total_price');
    total_price.innerText= seatArea.length * 550;

    // Apply-Button:
    const c_btn = document.getElementById('c_btn');
    if (seatArea.length >= 3) {
        c_btn.removeAttribute('disabled')
    }
    else{
        c_btn.setAttribute('disabled', true)
    }
}



// Cuppon code:

const apply =document.getElementById('c_btn').addEventListener('click', function () {
    const cupponCode = document.getElementById('c_value').value;
    const g_total = document.getElementById('g_total');
    if (cupponCode.toUpperCase() === 'NEW15') {
        g_total.innerText= parseInt((seatArea.length * 550)-((seatArea.length *550)*15/100));
    }
    else if (cupponCode.toUpperCase() === 'COUPLE20') {
        g_total.innerText = parseInt((seatArea.length * 550) - ((seatArea.length * 550)*20/100));
    }
})


// Form section:  

    const nameInput = document.getElementById('name');
    const numberInput = document.getElementById('number');
    const emailInput = document.getElementById('email');
    const next_btn = document.getElementById('next_btn');

function fromSection() {
    const name = nameInput.value.trim();
    const number = numberInput.value.trim();
    const email = emailInput.value.trim();

    if(name  && number   && email  && seatArea.length > 0){
        const next_btn = document.getElementById('next_btn');
        next_btn.removeAttribute('disabled');
        
    }
    else{
        next_btn.setAttribute('disabled', true);  
    }
}

nameInput.addEventListener('input', fromSection);
numberInput.addEventListener('input', fromSection);
emailInput.addEventListener('input', fromSection);

// Next-btn:

next_btn.addEventListener('click', function () {
    const showPageHide = document.querySelectorAll('.bus-ticket');
    const hidePageShow = document.getElementById('success-page');
    for( page of showPageHide){
        page.classList.add('hidden');
        hidePageShow.classList.remove('hidden')
    }
    seatArea=[];
    for(const seat of seats){
        seat.classList.remove('bg-green-400','text-white');
    }
    updateSeatInfo();
    nameInput.value='';
    numberInput.value = '';
    emailInput.value = '';
    next_btn.setAttribute('disabled', true)

})

// Continue-btn:
const continue_btn = document.getElementById('continue_btn')
continue_btn.addEventListener('click', function () {
    const hidePageShow = document.querySelectorAll('.bus-ticket');
    const showPageHide = document.getElementById('success-page');
    for(page of hidePageShow){
        page.classList.remove('hidden');
        showPageHide.classList.add('hidden');
    }
    

})

