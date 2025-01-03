// User Management
let currentUser = null;

function toggleForms(show) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (show === 'login') {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
    } else {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Basic validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Simulate login (replace with actual authentication)
    currentUser = { email };
    showMusicPlayer();
    return false;
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Basic validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    // Simulate registration (replace with actual registration)
    currentUser = { name, email };
    showMusicPlayer();
    return false;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMusicPlayer() {
    document.getElementById('authForms').classList.add('d-none');
    document.getElementById('musicPlayer').classList.remove('d-none');
}

// Music Player Functions
let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    { title: 'Sample Song 1', url: '' },
    { title: 'Sample Song 2', url: '' },
    { title: 'Sample Song 3', url: '' }
];

function playPause() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
    // Add actual audio playback logic here
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateCurrentSong();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateCurrentSong();
}

function updateCurrentSong() {
    document.getElementById('currentSong').textContent = songs[currentSongIndex].title;
}