export const AUTH_STORAGE_KEY = 'currentUser';
export const API_BASE_URL = '/api/auth';

export const MUSIC_SOURCES = {
    JAMENDO: 'https://api.jamendo.com/v3.0/tracks/',
    FALLBACK_TRACKS: [
        {
            title: 'Acoustic Breeze',
            artist: 'Benjamin Tissot',
            url: 'https://www.bensound.com/bensound-acousticbreeze.mp3'
        },
        {
            title: 'Summer',
            artist: 'Benjamin Tissot',
            url: 'https://www.bensound.com/bensound-summer.mp3'
        }
    ]
};