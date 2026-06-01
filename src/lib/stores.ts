import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Helper to get initial value from localStorage
function getInitialSession() {
    if (browser) {
        const stored = localStorage.getItem('session');
        return stored ? JSON.parse(stored) : null;
    }
    return null;
}

// Create the store with initial value from localStorage
export const sessionStore = writable(getInitialSession());

// Subscribe to save changes to localStorage (only in browser)
if (browser) {
    sessionStore.subscribe(value => {
        if (value) {
            localStorage.setItem('session', JSON.stringify(value));
        } else {
            localStorage.removeItem('session'); // Clear if null
        }
    });
}
