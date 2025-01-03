// Audio utilities
export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const calculateProgress = (currentTime, duration) => {
    return (currentTime / duration) * 100;
};