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
        // Event has passed
        document.querySelector('.countdown-timer').innerHTML = "<p>Sự kiện đã diễn ra!</p>";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) /  (1000 * 60 * 60)).toString().padStart(2,'0');
    const minutes = Math.floor((distance % (1000 * 60 * 60)) /  (1000 * 60)).toString().padStart(2,'0');
    const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2,'0');

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// RSVP Form Submission
function submitRSVP(event) {
    event.preventDefault();
    const form = document.getElementById('rsvp-form');
    const name = form.name.value;
    const guests = form.guests.value;
    const message = form.message.value;
    // Process or send the data as needed

    form.style.display = 'none';
    document.getElementById('rsvp-thank-you').style.display = 'block';
}

// Mobile Navigation fix: close menu on link or outside click
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Make sure nav-menu is clickable
    navMenu.addEventListener('click', (e) => {
        if(e.target.tagName === 'A') {
            // user clicked a nav link
            navToggle.checked = false;
        }
    });

    // If user taps outside the menu while it's open, close it
    document.addEventListener('click', (e) => {
        if(navToggle.checked === true 
           && !e.target.closest('.nav-menu') 
           && !e.target.closest('.nav-toggle-label')) {
            navToggle.checked = false;
        }
    });
});

// Music Player
document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const currentSongTitle = document.getElementById('current-song-title');

    let isPlaying = false;
    let currentSongIndex = 0;

    const playlist = [
        {
            title: "Bài Hát 1",
            src: "music/Childhood(chosic.com).mp3"
        },
        {
            title: "Bài Hát 2",
            src: "music/Fall-In-Love-chosic.com_.mp3"
        },
        {
            title: "Bài Hát 3",
            src: "music/Lovely-Long-Version-chosic.com_.mp3"
        },
        {
            title: "Bài Hát 4",
            src: "music/precious-memories(chosic.com).mp3"
        },
        {
            title: "Bài Hát 5",
            src: "music/ReachingtheSkyLongVersion-320bit(chosic.com).mp3"
        },
        {
            title: "Bài Hát 6",
            src: "music/Romantic-Day-chosic.com_.mp3"
        },
        {
            title: "Bài Hát 7",
            src: "music/ron-gelinas-chillout-lounge-where-will-i-go(chosic.com).mp3"
        },
        {
            title: "Bài Hát 8",
            src: "music/scott-buckley-felicity(chosic.com).mp3"
        },
        {
            title: "Bài Hát 9",
            src: "music/twisterium-eternal-love(chosic.com).mp3"
        }
    ];

    function loadSong(index) {
        audioPlayer.src = playlist[index].src;
        currentSongTitle.textContent = playlist[index].title;
    }

    function playSong() {
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function pauseSong() {
        audioPlayer.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    nextBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    });

    prevBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    });

    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = volumeSlider.value;
    });

    audioPlayer.addEventListener('ended', function() {
        nextBtn.click();
    });

    // Load the first song
    loadSong(currentSongIndex);
});
