import { AUTH_STORAGE_KEY } from '../config/constants.js';

export const storageService = {
    saveUser(user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    },
    
    getUser() {
        const data = localStorage.getItem(AUTH_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    },
    
    clearUser() {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
};