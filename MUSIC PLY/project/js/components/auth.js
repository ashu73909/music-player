import { authService } from '../services/authService.js';
import { validateEmail, validatePassword, showError } from '../utils/validation.js';

export class AuthComponent {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
        });
    }

    bindEvents() {
        const loginForm = document.getElementById('loginForm')?.querySelector('form');
        const registerForm = document.getElementById('registerForm')?.querySelector('form');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        document.querySelectorAll('[data-auth]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleForms(e.target.dataset.auth.replace('show', '').toLowerCase());
            });
        });
    }

    toggleForms(show) {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (show === 'login') {
            loginForm?.classList.remove('d-none');
            registerForm?.classList.add('d-none');
        } else {
            loginForm?.classList.add('d-none');
            registerForm?.classList.remove('d-none');
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;

        if (!email || !password) return;

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        try {
            await authService.login(email, password);
            window.showMusicPlayer();
        } catch (error) {
            showError(error.message);
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        const name = document.getElementById('registerName')?.value;
        const email = document.getElementById('registerEmail')?.value;
        const password = document.getElementById('registerPassword')?.value;

        if (!name || !email || !password) return;

        if (!validateEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            showError('Password must be at least 6 characters long');
            return;
        }

        try {
            await authService.register(name, email, password);
            window.showMusicPlayer();
        } catch (error) {
            showError(error.message);
        }
    }
}