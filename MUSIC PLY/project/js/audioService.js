// Audio Service for handling music playback
export class AudioService {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.currentIndex = 0;
    }

    async loadPlaylist() {
        try {
            // Free music from Free Music Archive API
            const response = await fetch('https://freemusicarchive.org/api/get/tracks.json?api_key=DEMO&limit=10');
            const data = await response.json();
            this.playlist = data.dataset.map(track => ({
                title: track.track_title,
                artist: track.artist_name,
                url: track.track_file_url
            }));
            return this.playlist;
        } catch (error) {
            console.error('Error loading playlist:', error);
            // Fallback to default tracks if API fails
            this.playlist = [
                { title: 'Jazz Meditation', artist: 'Free Music', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Derek_Clegg/Basement_Demo/Derek_Clegg_-_01_-_House.mp3' },
                { title: 'Acoustic Breeze', artist: 'Free Music', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3' },
                { title: 'Summer Nights', artist: 'Free Music', url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3' }
            ];
            return this.playlist;
        }
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    setTrack(index) {
        this.currentIndex = index;
        this.audio.src = this.playlist[index].url;
        this.play();
    }

    getCurrentTime() {
        return this.audio.currentTime;
    }

    getDuration() {
        return this.audio.duration;
    }
}