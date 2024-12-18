// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Countdown Timer
const weddingDate = new Date("2024-12-29T00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance < 0) {
        document.querySelector('.countdown-timer').innerHTML = "<p>Sự kiện đã diễn ra!</p>";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2,'0');
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2,'0');
    const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2,'0');

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP Form Submission
async function submitRSVP(event) {
    event.preventDefault();
    const form = document.getElementById('rsvp-form');
    const name = form.name.value.trim();
    const guests = form.guests.value.trim();
    const message = form.message.value.trim();

    const scriptURL = "https://script.google.com/macros/s/AKfycbwOq8Fm7c5zBRvU1RNo9CFLQVM9Z9Qx2aB-UAIZncDJiqumohMacLCFLKLAXlt8hZYEMQ/exec";

    try {
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Guests", guests);
        formData.append("Message", message);

        await fetch(scriptURL, { method: 'POST', body: formData });

        form.style.display = 'none';
        document.getElementById('rsvp-thank-you').style.display = 'block';
    } catch (error) {
        console.error('RSVP Form Submission Error:', error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
}

// Mobile Navigation: close menu when nav link clicked
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navMenu && navToggle) {
        navMenu.addEventListener('click', (e) => {
            if(e.target.tagName === 'A') {
                navToggle.checked = false;
            }
        });
    }
});