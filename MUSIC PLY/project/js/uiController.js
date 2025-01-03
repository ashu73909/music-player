// UI Controller for handling interface updates
export class UIController {
    constructor(audioService) {
        this.audioService = audioService;
        this.initializeUI();
    }

    initializeUI() {
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentSongElement = document.getElementById('currentSong');
        this.artistElement = document.getElementById('currentArtist');
        this.playlistElement = document.getElementById('playlist');

        // Update progress bar
        setInterval(() => {
            const progress = (this.audioService.getCurrentTime() / this.audioService.getDuration()) * 100;
            this.progressBar.style.width = `${progress}%`;
        }, 1000);
    }

    updatePlaylist(playlist) {
        this.playlistElement.innerHTML = playlist.map((track, index) => `
            <div class="playlist-item ${index === 0 ? 'active' : ''}" onclick="window.playTrack(${index})">
                <div class="track-info">
                    <span class="track-title">${track.title}</span>
                    <span class="track-artist">${track.artist}</span>
                </div>
            </div>
        `).join('');
    }

    updateNowPlaying(track) {
        this.currentSongElement.textContent = track.title;
        this.artistElement.textContent = track.artist;
    }

    togglePlayPauseButton(isPlaying) {
        this.playPauseBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    }
}