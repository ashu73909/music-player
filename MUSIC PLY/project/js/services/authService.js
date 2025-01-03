import { storageService } from './storageService.js';

class AuthService {
    constructor() {
        this.users = new Map();
    }

    async login(email, password) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = this.users.get(email);
        if (!user || user.password !== password) {
            throw new Error('Invalid email or password');
        }
        
        const userData = { email: user.email, name: user.name };
        storageService.saveUser(userData);
        return userData;
    }

    async register(name, email, password) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (this.users.has(email)) {
            throw new Error('User already exists');
        }
        
        const user = { name, email, password };
        this.users.set(email, user);
        
        const userData = { email, name };
        storageService.saveUser(userData);
        return userData;
    }

    isLoggedIn() {
        return storageService.getUser() !== null;
    }

    logout() {
        storageService.clearUser();
    }
}

export const authService = new AuthService();