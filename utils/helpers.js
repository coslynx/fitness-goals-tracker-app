import { isValidEmail } from './validators';

export const formatDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error('Invalid date object');
    }
    return date.toLocaleDateString('en-US');
};

export const validateGoalInput = (activityType, target) => {
    const errors = {};
    if (!activityType) {
        errors.activityType = 'Activity type is required.';
    }
    if (typeof target !== 'number' || target <= 0) {
        errors.target = 'Target must be a positive number.';
    }
    return errors;
};

export const cleanInput = (input) => {
    if (typeof input === 'string') {
        return input.trim();
    }
    return input;
};

export const isEmailValid = (email) => {
    if (!email) {
        return false;
    }
    return isValidEmail(email);
};

export const generateNotificationMessage = (type, message) => {
    if (!type || !message) {
        throw new Error('Type and message are required for generating notification');
    }
    return {
        id: Date.now(),
        type,
        message
    };
};

export const calculateProgressPercentage = (currentValue, targetValue) => {
    if (targetValue <= 0) {
        throw new Error('Target value must be greater than zero');
    }
    return Math.min((currentValue / targetValue) * 100, 100).toFixed(2);
};

export const validateProgressInput = (currentValue) => {
    if (typeof currentValue !== 'number' || currentValue < 0) {
        throw new Error('Current value must be a non-negative number');
    }
    return true;
};