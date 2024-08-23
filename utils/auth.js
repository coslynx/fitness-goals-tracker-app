import firebase from 'firebase/app';
import 'firebase/auth';
import { isEmailValid } from './helpers';

const auth = firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}).auth();

export const registerUser = async (email, password) => {
    if (!isEmailValid(email)) {
        throw new Error('Invalid email format');
    }
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const loginUser = async (email, password) => {
    if (!isEmailValid(email)) {
        throw new Error('Invalid email format');
    }
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logoutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        throw new Error('Logout failed: ' + error.message);
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const resetPassword = async (email) => {
    if (!isEmailValid(email)) {
        throw new Error('Invalid email format');
    }
    try {
        await auth.sendPasswordResetEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
};