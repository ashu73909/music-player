import { AudioService } from '../services/audioService.js';
import { formatTime, calculateProgress } from '../utils/audioUtils.js';

export class PlayerComponent {
    constructor() {
        this.audioService = new AudioService();
        this.initializePlayer();
    }

    async initializePlayer() {
        try {
            const playlist = await this.audioService.loadPlaylist();
            this.updatePlaylist(playlist);
            
            if (playlist.length > 0) {
                await this.audioService.setTrack(0);
                this.updateNowPlaying(playlist[0]);
            }
        } catch (error) {
            console.error('Error initializing player:', error);
            document.getElementById('currentSong').textContent = 'Error loading music';
        }
    }

    updatePlaylist(playlist) {
        const playlistElement = document.getElementById('playlist');
        playlistElement.innerHTML = playlist.map((track, index) => `
            <div class="playlist-item ${index === 0 ? 'active' : ''}" onclick="player.playTrack(${index})">
                <div class="track-info">
                    <span class="track-title">${track.title}</span>
                    <span class="track-artist">${track.artist}</span>
                </div>
            </div>
        `).join('');
    }

    updateNowPlaying(track) {
        document.getElementById('currentSong').textContent = track.title;
        document.getElementById('currentArtist').textContent = track.artist;
    }

    async playTrack(index) {
        const success = await this.audioService.setTrack(index);
        if (success) {
            this.updateNowPlaying(this.audioService.playlist[index]);
            this.togglePlayPauseButton(true);
        }
    }

    togglePlayPause() {
        if (this.audioService.audio.paused) {
            this.audioService.play();
        } else {
            this.audioService.pause();
        }
        this.togglePlayPauseButton(!this.audioService.audio.paused);
    }

    togglePlayPauseButton(isPlaying) {
        const playPauseBtn = document.getElementById('playPauseBtn');
        playPauseBtn.innerHTML = isPlaying ? 
            '<i class="fas fa-pause"></i>' : 
            '<i class="fas fa-play"></i>';
    }
}