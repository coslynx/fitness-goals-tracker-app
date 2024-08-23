import React, { useEffect, useState } from 'react';
import { useStore } from '../utils/store';
import { fetchUserProfile, updateUserProfile } from '../utils/api';
import Notification from '../components/Notification';

const Profile = () => {
    const { user } = useStore((state) => state);
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const data = await fetchUserProfile(user.id);
                setUserData(data);
            } catch (err) {
                setError('Failed to load user profile.');
                console.error(err);
            }
        };

        if (user) {
            getUserProfile();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await updateUserProfile(user.id, userData);
            setSuccess(true);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile.');
            console.error(err);
        }
    };

    return (
        <div className="profile-page">
            <h1 className="text-3xl font-bold">Profile</h1>

            {success && <Notification message="Profile updated successfully!" />}
            {error && <Notification message={error} />}

            <form onSubmit={handleSave} className="mt-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            className="border border-gray-400 p-2 w-full"
                            required
                        />
                    ) : (
                        <p className="border border-gray-300 p-2">{userData.name || 'N/A'}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email</label>
                    {isEditing ? (
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="border border-gray-400 p-2 w-full"
                            required
                        />
                    ) : (
                        <p className="border border-gray-300 p-2">{userData.email || 'N/A'}</p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setIsEditing((prev) => !prev)}
                    className="bg-secondary text-white py-2 px-4 rounded hover:bg-primary"
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
                {isEditing && (
                    <button
                        type="submit"
                        className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary ml-2"
                    >
                        Save
                    </button>
                )}
            </form>
        </div>
    );
};

export default Profile;