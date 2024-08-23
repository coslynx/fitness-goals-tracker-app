import axios from 'axios';
import { cleanInput, validateGoalInput, calculateProgressPercentage } from './helpers';

const API_BASE_URL = process.env.API_BASE_URL;

// Create a new goal for the authenticated user
export const createGoal = async (goalData) => {
    const cleanedData = {
        activityType: cleanInput(goalData.activityType),
        target: goalData.target,
        userId: goalData.userId,
    };
    
    const errors = validateGoalInput(cleanedData.activityType, cleanedData.target);
    if (Object.keys(errors).length > 0) {
        throw new Error('Validation failed: ' + JSON.stringify(errors));
    }
    
    try {
        const response = await axios.post(`${API_BASE_URL}/goals`, cleanedData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating goal: ' + error.message);
    }
};

// Fetch the user's progress data
export const fetchProgressData = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/progress/${userId}`);
        return response.data.map(item => ({
            date: new Date(item.date).toLocaleDateString(),
            value: calculateProgressPercentage(item.currentValue, item.targetValue),
        }));
    } catch (error) {
        throw new Error('Error fetching progress data: ' + error.message);
    }
};

// Fetch user profile information
export const fetchUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user profile: ' + error.message);
    }
};

// Update user profile information
export const updateUserProfile = async (userId, userData) => {
    const cleanedData = {
        name: cleanInput(userData.name),
        email: cleanInput(userData.email),
    };
    
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${userId}`, cleanedData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating user profile: ' + error.message);
    }
};

// Send notification message (could be integrated with a notifications service)
export const sendNotification = async (message) => {
    try {
        await axios.post(`${API_BASE_URL}/notifications`, { message });
    } catch (error) {
        throw new Error('Error sending notification: ' + error.message);
    }
};