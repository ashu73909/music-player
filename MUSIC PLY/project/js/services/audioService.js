// Audio service for handling music playback and playlist management
export class AudioService {
    constructor() {
        this.audio = new Audio();
        this.playlist = [];
        this.currentIndex = 0;
        this.fallbackTracks = [
            {
                title: 'Acoustic Breeze',
                artist: 'Benjamin Tissot',
                url: 'https://cdn.bensound.com/bensound-acousticbreeze.mp3'
            },
            {
                title: 'Summer',
                artist: 'Benjamin Tissot',
                url: 'https://cdn.bensound.com/bensound-summer.mp3'
            },
            {
                title: 'Jazz Piano',
                artist: 'Benjamin Tissot',
                url: 'https://cdn.bensound.com/bensound-jazzyfrenchy.mp3'
            }
        ];
    }

    async loadPlaylist() {
        try {
            // First try loading from a music API
            const response = await fetch('https://api.jamendo.com/v3.0/tracks/?client_id=YOUR_CLIENT_ID&format=json&limit=10');
            const data = await response.json();
            
            if (data && data.results && data.results.length > 0) {
                this.playlist = data.results.map(track => ({
                    title: track.name,
                    artist: track.artist_name,
                    url: track.audio
                }));
            } else {
                // If API fails or returns no results, use fallback tracks
                this.playlist = [...this.fallbackTracks];
            }
        } catch (error) {
            console.log('Using fallback playlist due to API error:', error);
            this.playlist = [...this.fallbackTracks];
        }
        
        return this.playlist;
    }

    play() {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Playback error:', error);
                // Try playing the next song if current one fails
                this.next();
            });
        }
    }

    pause() {
        this.audio.pause();
    }

    async setTrack(index) {
        try {
            this.currentIndex = index;
            const track = this.playlist[index];
            
            // Pre-load the audio to check if it's playable
            this.audio.src = track.url;
            await this.audio.load();
            
            this.play();
            return true;
        } catch (error) {
            console.error('Error setting track:', error);
            // Try playing the next track if current one fails
            if (index < this.playlist.length - 1) {
                return this.setTrack(index + 1);
            }
            return false;
        }
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.playlist.length;
        return this.setTrack(nextIndex);
    }

    previous() {
        const prevIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        return this.setTrack(prevIndex);
    }

    getCurrentTime() {
        return this.audio.currentTime;
    }

    getDuration() {
        return this.audio.duration || 0;
    }

    setVolume(value) {
        this.audio.volume = Math.max(0, Math.min(1, value));
    }

    seek(time) {
        if (time >= 0 && time <= this.audio.duration) {
            this.audio.currentTime = time;
        }
    }
}