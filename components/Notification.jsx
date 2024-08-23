import React, { useEffect, useState } from 'react';
import { useStore } from '../utils/store';
import { sendNotification } from '../utils/api';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const addNotification = useStore((state) => state.addNotification);

    useEffect(() => {
        const handleNewNotification = (message) => {
            const newNotification = { id: Date.now(), message };
            setNotifications((prev) => [...prev, newNotification]);
            addNotification(newNotification);
            sendNotification(newNotification.message).catch((error) => {
                console.error("Error sending notification:", error);
            });
        };

        // Subscribe to notifications (This should link to a notification source)
        const subscription = subscribeToNotifications(handleNewNotification);

        return () => {
            subscription.unsubscribe();
        };
    }, [addNotification]);

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <div className="absolute top-0 right-0 p-4">
            {notifications.map(({ id, message }) => (
                <div
                    key={id}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2"
                >
                    {message}
                    <button
                        className="ml-2 text-white"
                        onClick={() => removeNotification(id)}
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Notification;

const subscribeToNotifications = (callback) => {
    const intervalId = setInterval(() => {
        const randomMessages = [
            "You have a new friend request!",
            "Your workout goal has been updated.",
            "Don't forget to log your workout!",
        ];
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        callback(randomMessage);
    }, 5000);

    return {
        unsubscribe: () => clearInterval(intervalId),
    };
};