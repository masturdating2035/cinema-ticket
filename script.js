const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    const seatIndex = [...selectedSeats].map(item => [...seats].indexOf(item));

    localStorage.setItem('selectorSeat', JSON.stringify(seatIndex));

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}


function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Get data from locals and populateUI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectorSeat'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectMovieIndex !== null) {
        movieSelect.selectedIndex = selectMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})


// Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})


// Initial count and total set
updateSelectedCount();